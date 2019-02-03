import { User } from 'src/app/auth/models/user.model'
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity'
import { UserActionTypes, UserActions } from '../actions/user.actions'

export interface UserState extends EntityState<User> {}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>()

const initialUserState: EntityState<User> = userAdapter.getInitialState()

export function userReducer(state = initialUserState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return userAdapter.updateOne(action.payload, state)
    case UserActionTypes.UPDATE_USER_FAIL:
      return state
    default:
      return state
  }
}
