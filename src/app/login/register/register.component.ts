import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {
	avatars: string[] = []

	constructor() {}

	ngOnInit() {
		this.getAvatars()
	}

	getAvatars() {
		for (let index = 0; index < 16; index++) {
			this.avatars.push(`avatars:svg-${index + 1}`)
		}
	}
}
