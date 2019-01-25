import { Action } from '@ngrx/store'
import { User } from 'src/app/auth/models/user.model'

export enum AuthActionTypes {
  LOGIN = '[Auth] login',
  LOGIN_SUCCESS = '[Auth] login success',
  LOGIN_FAIL = '[Auth] login fail',
  LOGOUT = '[Auth] logout'
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.LOGIN

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS

  constructor(public payload: { token: string; user: User }) {}
}

export class LoginFailAction implements Action {
  readonly type = AuthActionTypes.LOGIN_FAIL
}

export class LogoutAction implements Action {
  readonly type = AuthActionTypes.LOGOUT
}

export type AuthActions = LoginAction | LoginSuccessAction | LoginFailAction | LogoutAction
