import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IUser from 'src/app/models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }

  public async createUser(userData: IUser) {
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email, userData.password
    )
    await this.db.collection('users').add({
      name: userData.name,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
      email: userData.email
    });
  }
}
