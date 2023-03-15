import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
	videoOrder = '1'
	
	constructor(
		private router: Router,
		private route: ActivatedRoute
	){}
	
	ngOnInit(): void {
		this.route.queryParamMap.subscribe (
				(params: Params) => {
					console.log(
						params['get']
					)
				this.videoOrder = params['get']('sort') === '2' ? params['get']('sort') : '1'
			}
		)
	}
 
	sort(event: Event) {
		const { value } = (event.target as HTMLSelectElement)

		this.router.navigateByUrl(`/manage?sort=${value}`)
	}

}
