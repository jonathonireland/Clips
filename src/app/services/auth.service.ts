import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import IUser from 'src/app/models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.usersCollection = db.collection('users');
   }

  public async createUser(userData: IUser) {
    
    if(!userData.password){
      throw new Error("Password not provided!")
    }
    
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email, userData.password
    )
    
    if(!userCred.user){
      throw new Error("User can't be found")
    }

    await this.usersCollection.doc(userCred.user?.uid).set({
      name: userData.name,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
      email: userData.email
    })

    await userCred.user.updateProfile({
      displayName: userData.name
    })
  }
}
