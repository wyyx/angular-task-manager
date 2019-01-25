import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { LoginAction } from '../store/actions/auth.actions'
import { getLoggedIn } from '../store/selectors/auth.selectors'
import { tap, takeUntil } from 'rxjs/operators'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  kill$: Subject<any> = new Subject()

  loginForm: FormGroup
  constructor(private fb: FormBuilder, private store: Store<AppState>, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const value = this.loginForm.value
      const { email, password } = value
      console.log(value)
      this.store.dispatch(new LoginAction({ email, password }))
    } else {
      return
    }
  }
}
