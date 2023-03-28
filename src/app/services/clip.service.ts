import { Injectable } from '@angular/core';
import { 
	AngularFirestore, AngularFirestoreCollection, DocumentReference, 
	QuerySnapshot 
} from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ClipService {
	public clipsCollection: AngularFirestoreCollection
	constructor (
		private db: AngularFirestore,
		private auth: AngularFireAuth
	){
		this.clipsCollection = db.collection('clips')
	}

	createClip(data: IClip) : Promise<DocumentReference<IClip> | any> {
		return this.clipsCollection.add(data)
	}

	getUserClips(){
		return this.auth.user.pipe(
			switchMap(user => {
					if(!user) {
						return of([])
					}

					const query = this.clipsCollection.ref.where(
					'uid', '==', user.uid
					)

					return query.get()
				}),
				map(snapshot => (snapshot as QuerySnapshot<IClip>).docs)
		)
	}
}
