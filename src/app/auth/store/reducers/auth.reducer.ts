import { AuthActions, AuthActionTypes } from '../actions/auth.actions'
import { User } from 'src/app/auth/models/user.model'

export interface AuthState {
  token: string
  user: User
}

const initialAuthState: AuthState = {
  token: '',
  user: null
}

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return { ...state, ...action.payload }
    case AuthActionTypes.LOGIN_FAIL:
      return state
    case AuthActionTypes.LOGOUT:
      return { ...state, token: '', user: null }
    default:
      return state
  }
}
