import { Action } from '@ngrx/store'
import { User } from 'src/app/auth/models/user.model'
import { Update } from '@ngrx/entity'

export enum UserActionTypes {
  UPDATE_USER = '[App] update user'
}

export class UpdateUserAction implements Action {
  readonly type: string = UserActionTypes.UPDATE_USER

  constructor(public payload: Update<User>) {}
}

export type UserActions = UpdateUserAction
