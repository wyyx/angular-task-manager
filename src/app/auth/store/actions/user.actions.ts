import { Action } from '@ngrx/store'
import { User } from 'src/app/auth/models/user.model'
import { Update } from '@ngrx/entity'

export enum UserActionTypes {
  NEED_USERS = '[Auth] need users',
  LOAD_USERS = '[Auth] load users',
  LOAD_USERS_SUCCESS = '[Auth] load users success',
  LOAD_USERS_FAIL = '[Auth] load user fail',
  UPDATE_USER = '[Auth] update user',
  UPDATE_USER_SUCCESS = '[Auth] update user success',
  UPDATE_USER_FAIL = '[Auth] update user fail'
}

export class NeedUsersAction implements Action {
  readonly type = UserActionTypes.NEED_USERS

  constructor(public payload: { userIds: string[] }) {}
}

export class LoadUsersAction implements Action {
  readonly type = UserActionTypes.LOAD_USERS

  constructor(public payload: { userIds: string[] }) {}
}

export class LoadUsersSuccessAction implements Action {
  readonly type = UserActionTypes.LOAD_USERS_SUCCESS

  constructor(public payload: User[]) {}
}

export class LoadUsersFailAction implements Action {
  readonly type = UserActionTypes.LOAD_USERS_FAIL
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

export type UserActions =
  | NeedUsersAction
  | UpdateUserAction
  | UpdateUserSuccessAction
  | UpdateUserFailAction
  | LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUsersFailAction
