import { Component, OnInit, OnDestroy } from '@angular/core'
import {
	FormGroup,
	FormBuilder,
	Validators,
	AbstractControl,
	ValidatorFn,
	ValidationErrors,
	FormControl,
	FormGroupDirective,
	NgForm
} from '@angular/forms'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { ErrorStateMatcher } from '@angular/material'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit, OnDestroy {
	kill$: Subject<any> = new Subject()
	registerForm = this.fb.group({
		email: [ '', Validators.compose([ Validators.required, Validators.email ]) ],
		passwordGroup: this.fb.group(
			{
				password: [ '', Validators.compose([ Validators.required ]) ],
				repassword: [ '', Validators.compose([ Validators.required ]) ]
			},
			{ validator: validateRepassword }
		),
		certificate: [ '', Validators.required ],
		age: [ '1990-01-01' ],
		address: [ '', validateAddress ],
		avatar: [ '', Validators.compose([ Validators.required ]) ]
	})

	items: string[] = []
	selected: string
	repasswordMatcher = new RepasswordMatcher(this.registerForm.get('passwordGroup'))

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
		this.getAvatars()
	}

	ngOnDestroy(): void {
		this.kill$.next()
		this.kill$.complete()
	}

	getAvatars() {
		for (let index = 0; index < 16; index++) {
			this.items.push(`avatars:svg-${index + 1}`)
		}
	}

	onRegisterClick() {
		// if (this.registerForm.valid) {
		console.log('registerForm', this.registerForm.value)
		console.log(
			'registerForm.passwordGroup.valid',
			this.registerForm.get('passwordGroup').valid
		)
		// }
	}
}

function validateAddress(control: AbstractControl) {
	const value = control.value
	if (value instanceof Array && value[0] && value[1] && value[2]) {
		return null
	} else {
		return {
			addressValidation: true
		}
	}
}

function validateRepassword(group: FormGroup): ValidationErrors {
	const password = group.get('password').value
	const repassword = group.get('repassword').value

	return password === repassword
		? null
		: {
				repassword: true
			}
}

export class RepasswordMatcher implements ErrorStateMatcher {
	constructor(private group: AbstractControl) {}

	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		return (control && control.touched && control.invalid) ||
		(control && control.touched && this.group && this.group.invalid)
			? true
			: false
	}
}
