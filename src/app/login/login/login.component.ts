import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup
	constructor(private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			email: [ '', Validators.compose([ Validators.required, Validators.email ]) ],
			password: [ '', Validators.required ]
		})
	}

	ngOnInit() {}

	onSubmit() {
		if (this.loginForm.valid) {
			console.log('submitted')
		} else {
			return
		}
	}
}
