import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { LoginAction, AuthActionTypes, LoginFailAction } from '../store/actions/auth.actions'
import { getIsLoggedIn, getIsLogging, getIsLoginFail } from '../store/selectors/auth.selectors'
import { tap, takeUntil, take } from 'rxjs/operators'
import { Router } from '@angular/router'
import { Subject, Observable } from 'rxjs'
import { MatSnackBar } from '@angular/material'
import { AlertComponent } from './alert/alert.component'
import { Actions, ofType } from '@ngrx/effects'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  kill$: Subject<any> = new Subject()
  isLogging$: Observable<boolean>
  email: AbstractControl
  password: AbstractControl

  loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private snackBar: MatSnackBar,
    private actions$: Actions
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['zhangsan@163.com', Validators.compose([Validators.required, Validators.email])],
      password: ['123456', Validators.required]
    })
    this.email = this.loginForm.controls['email']
    this.password = this.loginForm.controls['password']

    this.isLogging$ = this.store.pipe(select(getIsLogging))

    this.actions$
      .pipe(
        ofType<LoginFailAction>(AuthActionTypes.LOGIN_FAIL),
        tap(_ => this.openSnackBar()),
        takeUntil(this.kill$)
      )
      .subscribe()

    this.store
      .pipe(
        select(getIsLoggedIn),
        tap(loggedIn => loggedIn && this.router.navigateByUrl('/projects')),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  openSnackBar() {
    this.snackBar.openFromComponent(AlertComponent, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: 'error-alert'
    })
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const value = this.loginForm.value
      const { email, password } = value
      this.store.dispatch(new LoginAction({ email, password }))
    } else {
      return
    }
  }
}
