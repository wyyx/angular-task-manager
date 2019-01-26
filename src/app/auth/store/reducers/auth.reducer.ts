import { AuthActions, AuthActionTypes } from '../actions/auth.actions'
import { User } from 'src/app/auth/models/user.model'

export interface AuthState {
  token: string
  user: User
  isLoggingIn: boolean
}

const initialAuthState: AuthState = {
  token: '',
  user: null,
  isLoggingIn: false
}

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, isLoggingIn: true }
    case AuthActionTypes.LOGIN_SUCCESS:
      const { token, user } = { ...action.payload }
      return { ...state, token, user, isLoggingIn: false }
    case AuthActionTypes.LOGIN_FAIL:
      return { ...state, isLoggingIn: false }
    case AuthActionTypes.LOGOUT:
      return { ...state, token: '', user: null }
    default:
      return state
  }
}
