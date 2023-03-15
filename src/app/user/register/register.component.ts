import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { EmailTaken } from '../validators/email-taken';
import IUser from 'src/app/models/user.model';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
	constructor(
		private auth: AuthService,
		private emailTaken: EmailTaken
	){ }
	
	inSubmission = false;
	
	name = new FormControl(
		'', // empty string
		[
			Validators.required, 
			Validators.minLength(3)
		]
	)
	email = new FormControl(
		'', // empty string
		[
			Validators.required, 
			Validators.email
		],
		[
			this.emailTaken.validate
		]
	)
	age = new FormControl<number | null>(
		null,
		[
			Validators.required,
			Validators.min(18),
			Validators.max(120)
		]
	)
	password = new FormControl(
		'', // empty string
		[
			Validators.required,
			Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
		]
	)
	confirm_password = new FormControl(
		'', // empty string
		[
			Validators.required
		]
	)
	phoneNumber = new FormControl(
		'', // empty string
		[
			Validators.required,
			Validators.minLength(13),
			Validators.maxLength(13)
		]
	)
  
	showAlert = false;
	alertMsg = 'Please wait! Your account is being created.';
	alertColor = 'blue';
	
	registerForm = new FormGroup(
		{
			name: this.name,
			email: this.email,
			age: this.age,
			password: this.password,
			confirm_password: this.confirm_password,
			phoneNumber: this.phoneNumber
		},
		[
			RegisterValidators.match('password','confirm_password')
		]
	)

	async register() {
	    this.showAlert = true
	    this.alertMsg = 'Please wait! Your account is being created.'
	    this.alertColor = 'blue'
	    this.inSubmission = true
		try {
			await this.auth.createUser(this.registerForm.value as IUser)
		} 
		catch (e) {
			console.error(e)
			this.alertMsg = 'An unexpected error occurred. Please try again later.'
			this.alertColor = 'red'
			this.inSubmission = false
			return
	    }
	    this.alertMsg='Success your account has been created.'
	    this.alertColor ='green'
  	}
}
