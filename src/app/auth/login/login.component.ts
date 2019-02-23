import {
  Component,
  OnDestroy,
  OnInit,
  HostBinding,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  AfterViewInit
} from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'
import { AppState } from 'src/app/store'
import { AuthActionTypes, LoginAction, LoginFailAction } from '../store/actions/auth.actions'
import { getIsLoggedIn, getIsLogging } from '../store/selectors/auth.selectors'
import { AlertComponent } from './alert/alert.component'
import { slideToRightAnim } from 'src/app/animations/route.anim'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideToRightAnim]
})
export class LoginComponent implements OnInit, OnDestroy {
  kill$: Subject<any> = new Subject()
  isLogging$: Observable<boolean>
  email: AbstractControl
  password: AbstractControl

  loginForm: FormGroup

  @HostBinding('@slideToRightAnim') state

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

    this.store
      .pipe(
        select(getIsLoggedIn),
        tap(loggedIn => loggedIn && this.router.navigateByUrl('/projects')),
        takeUntil(this.kill$)
      )
      .subscribe()

    this.actions$
      .pipe(
        ofType<LoginFailAction>(AuthActionTypes.LOGIN_FAIL),
        tap(_ => this.openSnackBar()),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  openSnackBar() {
    this.snackBar.openFromComponent(AlertComponent, {
      duration: 2000,
      verticalPosition: 'bottom',
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
