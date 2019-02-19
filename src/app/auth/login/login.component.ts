import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { LoginAction } from '../store/actions/auth.actions'
import { getIsLoggedIn } from '../store/selectors/auth.selectors'
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
      email: ['zhangsan@163.com', Validators.compose([Validators.required, Validators.email])],
      password: ['123456', Validators.required]
    })
  }

  ngOnInit() {
    this.store
      .pipe(
        select(getIsLoggedIn),
        tap(loggedIn => loggedIn && this.router.navigateByUrl('/projects')),
        takeUntil(this.kill$)
      )
      .subscribe()
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
