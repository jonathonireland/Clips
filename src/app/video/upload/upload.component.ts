import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last, switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ClipService } from 'src/app/services/clip.service';
import firebase from 'firebase/compat/app';
import { v4 as uuid } from 'uuid';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnDestroy {
	isDragOver = false
	nextStep = false
	file: File | null = null
	showAlert = false
	alertColor = 'blue'
	alertMsg = 'Please wait! Your clip is being uploaded.'
	inSubmission = false
	percentage = 0
	showPercentage = false
	user: firebase.User | null = null
	task?: AngularFireUploadTask
	
	title = new FormControl('',{
		validators: [
			Validators.required,
			Validators.minLength(3)
		],
		nonNullable: true
	})
	uploadForm = new FormGroup({
		title: this.title
	})
	
	constructor(
		private storage: AngularFireStorage,
		private auth: AngularFireAuth,
		private clipsService : ClipService
	) {
		auth.user.subscribe( user => this.user = user )
	}
	
	ngOnDestroy(): void {
		this.task?.cancel()
	}

	storeFile($event: Event){

	    this.isDragOver = false
	    
		this.file = ($event as DragEvent).dataTransfer ? 
		 ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
		 ($event.target as HTMLInputElement).files?.item(0) ?? null
	
	    if(!this.file || this.file.type !== 'video/mp4'){
	      return
	    }

		this.title.setValue(
			this.file.name.replace(/\.[^/.]+$/, '')
		)
	
	    this.nextStep = true
	}

	uploadFile() {
		this.showAlert = true
		this.alertColor = 'blue'
		this.alertMsg = 'Please wait! Your clip is being uploaded.'
		this.inSubmission = true
		this.showPercentage = true
		
		const clipFileName = uuid();
		const clipPath = `clips/${clipFileName}.mp4`

		this.task = this.storage.upload(clipPath, this.file)
		const clipRef = this.storage.ref(clipPath)

		this.task.percentageChanges().subscribe(progress => {
			this.percentage = progress as number / 100
		})
		this.task.snapshotChanges().pipe(
			last(),
			switchMap(()=> clipRef.getDownloadURL())
		).subscribe({
			next: (url)=> {
				const clip = {
					uid: this.user?.uid as string,
					displayName: this.user?.displayName as string,
					title: this.title.value,
					fileName: `${clipFileName}.mp4`,
					url
				}
				
				this.clipsService.createClip(clip)

				console.log(clip)

				this.alertColor = 'green'
				this.alertMsg = 'Success! Your clip is now ready to be shared with the world.'
				this.showPercentage = false
			},
			error: (error) => {
				this.alertColor = 'red'
				this.alertMsg = 'Upload failed! Please try again later.'
				this.inSubmission = true
				this.showPercentage = false
				console.error(error)
			}
		})
	}

}
