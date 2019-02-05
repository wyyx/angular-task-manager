import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType, OnInitEffects, ROOT_EFFECTS_INIT } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, exhaustMap, map, tap } from 'rxjs/operators'
import { AuthService } from 'src/app/auth/services/auth.service'
import {
  AuthActionTypes,
  LoginAction,
  LoginFailAction,
  LoginSuccessAction,
  LogoutAction,
  RegisterAction,
  RegisterSuccessAction,
  RegisterFailAction
} from '../actions/auth.actions'
import { AppState } from 'src/app/store'

@Injectable()
export class AuthEffects implements OnInitEffects {
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

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LoginAction) => action.payload),
    exhaustMap(({ email, password }) =>
      this.authService.login(email, password).pipe(
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

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType<RegisterAction>(AuthActionTypes.REGISTER),
    map(action => action.payload),
    exhaustMap(user =>
      this.authService.register(user).pipe(
        tap(({ token, user }) => {
          // Save auth state to local
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))

          // Navigate to projects page
          this.router.navigateByUrl('/projects')
        }),
        map(({ token, user }) => new RegisterSuccessAction({ token, user })),
        catchError(error => of(new RegisterFailAction()))
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

  @Effect()
  init$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')

      console.log(user, token)

      if (user && token) {
        this.router.navigateByUrl('/projects')
        return new LoginSuccessAction({ user: JSON.parse(user), token })
      } else {
        this.router.navigateByUrl('/login')
        return new LogoutAction()
      }
    })
  )

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>
  ) {}
}
