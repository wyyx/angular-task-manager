import { Action } from '@ngrx/store'
import { User } from 'src/app/auth/models/user.model'
import { Update } from '@ngrx/entity'

export enum UserActionTypes {
  UPDATE_USER = '[Auth] update user',
  UPDATE_USER_SUCCESS = '[Auth] update user success',
  UPDATE_USER_FAIL = '[Auth] update user fail'
}

export class UpdateUserAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER

  constructor(public payload: Update<User>) {}
}

export class UpdateUserSuccessAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER_SUCCESS

  constructor(public payload: Update<User>) {}
}

export class UpdateUserFailAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER_FAIL
}

export type UserActions = UpdateUserAction | UpdateUserSuccessAction | UpdateUserFailAction