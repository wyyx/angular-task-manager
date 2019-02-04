import { AuthState, authReducer } from './reducers/auth.reducer'
import { UserState, userReducer } from './reducers/user.reducer'
import { ActionReducerMap } from '@ngrx/store'
import { AuthEffects } from './effects/auth.effects'
import { UserEffects } from './effects/user.effects'

export interface AuthFeatureState {
  auth: AuthState
  users: UserState
}

export const authFeatureReducers: ActionReducerMap<AuthFeatureState> = {
  auth: authReducer,
  users: userReducer
}

export const authFeatureEffects = [AuthEffects, UserEffects]
