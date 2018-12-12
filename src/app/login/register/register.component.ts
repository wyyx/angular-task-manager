import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {
	registerForm = this.fb.group({
		email: [ '', Validators.compose([ Validators.required, Validators.email ]) ],
		password: [ '', Validators.compose([ Validators.required ]) ],
		rePassword: [ '', Validators.compose([ Validators.required ]) ],
		avatar: [ '', Validators.compose([ Validators.required ]) ]
	})

	items: string[] = []
	selected: string

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
		this.getAvatars()
	}

	getAvatars() {
		for (let index = 0; index < 16; index++) {
			this.items.push(`avatars:svg-${index + 1}`)
		}
	}
}
