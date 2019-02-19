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
import { Subject, Observable } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { ErrorStateMatcher } from '@angular/material'
import { markFormGroupAsTouched } from 'src/app/utils/form.util'
import { CertificateSelectorComponent } from 'src/app/shared/certificate-selector/certificate-selector.component'
import { AddressSelectorComponent } from 'src/app/shared/address-selector/address-selector.component'
import { Store, select } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { getIsRegistering } from '../store/selectors/auth.selectors'
import { RegisterAction } from '../store/actions/auth.actions'
import { User } from '../models/user.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  kill$: Subject<any> = new Subject()
  isRegistering$: Observable<boolean>
  registerForm = this.fb.group({
    name: [''],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    passwordGroup: this.fb.group(
      {
        password: ['', Validators.required],
        repassword: ['', Validators.required]
      },
      { validator: validatePasswordGroup }
    ),
    certificate: ['', Validators.required],
    age: ['1990-01-01'],
    address: ['', validateAddress],
    avatar: ['']
  })

  items: string[] = []
  selected: string
  repasswordMatcher = new RepasswordMatcher(this.registerForm.get('passwordGroup'))

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.getAvatars()
    this.isRegistering$ = this.store.pipe(select(getIsRegistering))
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

  onRegisterClick(
    certificateSelector: CertificateSelectorComponent,
    addressSelector: AddressSelectorComponent
  ) {
    markFormGroupAsTouched(this.registerForm)
    addressSelector.markAsTouched()
    certificateSelector.markAsTouched()

    if (this.registerForm.valid) {
      const formValue = this.registerForm.value

      this.store.dispatch(
        new RegisterAction({
          name: formValue.name,
          email: formValue.email,
          password: formValue.passwordGroup.password,
          address: formValue.address,
          avatar: formValue.avatar,
          certificate: formValue.certificate
        } as User)
      )
    }
  }
}

function validateAddress(control: AbstractControl) {
  const value = control.value
  if (value.province && value.city) {
    return null
  } else {
    return {
      addressValidation: true
    }
  }
}

function validatePasswordGroup(group: FormGroup): ValidationErrors {
  const password = group.get('password').value
  const repassword = group.get('repassword').value

  return password === repassword
    ? null
    : {
        passwordsInconsistent: true
      }
}

// To show error when passwordGroup is invalid
export class RepasswordMatcher implements ErrorStateMatcher {
  constructor(private group: AbstractControl) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.touched && control.invalid) ||
      (control && control.touched && this.group.invalid)
      ? true
      : false
  }
}
