import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

	constructor(
		public modal: ModalService, 
		public auth: AuthService,
		public afAuth: AngularFireAuth,
		private Router: Router
	) { }

	ngOnInit(): void {
	}

	openModal($event: Event){
		$event.preventDefault();
		this.modal.toggleModal('auth');
	}

	async logout($event: Event){
		$event.preventDefault()
		await this.afAuth.signOut();
		await this.Router.navigateByUrl('/');
	}

}
