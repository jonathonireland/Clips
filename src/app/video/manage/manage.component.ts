import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClipService }  from 'src/app/services/clip.service';

@Component({
	selector: 'app-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
	videoOrder = '1'
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private clipService: ClipService
	){}
	
	ngOnInit(): void {
		this.route.queryParamMap.subscribe ((params: Params) => {
			this.videoOrder = params['get']('sort') === '2' ? params['get']('sort') : '1'
		})
		this.clipService.getUserClips().subscribe(console.log)
	}
 
	sort(event: Event) {
		const { value } = (event.target as HTMLSelectElement)

		//this.router.navigateByUrl(`/manage?sort=${value}`)
		this.router.navigate([],{
			relativeTo: this.route,
			queryParams: {
				sort: value
			}
		})
	}

}
