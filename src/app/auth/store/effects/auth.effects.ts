import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, exhaustMap, map, tap, mergeMap } from 'rxjs/operators'
import { AuthService } from 'src/app/auth/services/auth.service'
import {
  AuthActionTypes,
  LoginAction,
  LoginFailAction,
  LoginSuccessAction,
  LogoutAction
} from '../actions/auth.actions'

@Injectable()
export class AuthEffects implements OnInitEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LoginAction) => action.payload),
    // tap(v => console.log('>>>', 'action', v)),
    exhaustMap(({ email, password }) =>
      this.authService.login(email, password).pipe(
        // tap(v => console.log('>>>', 'auth', v)),
        map(({ token, user }) => {
          // Save auth state to local
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))

          // Navigate to projects page
          this.router.navigateByUrl('/projects')

          return new LoginSuccessAction({ token, user })
        }),
        catchError(error => of(new LoginFailAction()))
      )
    )
  )

  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      // Clear local auth state
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      this.router.navigateByUrl('/login')
    })
  )

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

  ngrxOnInitEffects(): Action {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (user && token) {
      this.router.navigateByUrl('/projects')
      return new LoginSuccessAction({ user: JSON.parse(user), token })
    } else {
      this.router.navigateByUrl('/login')
      return new LogoutAction()
    }
  }
}