import { AuthActions, AuthActionTypes } from '../actions/auth.actions'
import { User } from 'src/app/auth/models/user.model'

export interface AuthState {
  token: string
  user: User
  isResigering: boolean
  isLogging: boolean
  isLoginFail: boolean
}

const initialAuthState: AuthState = {
  token: '',
  user: null,
  isResigering: false,
  isLogging: false,
  isLoginFail: false
}

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, isLogging: true }
    case AuthActionTypes.LOGIN_SUCCESS:
      return { ...state, ...action.payload, isLogging: false, isLoginFail: false }
    case AuthActionTypes.LOGIN_FAIL:
      return { ...state, isLogging: false, isLoginFail: true }
    case AuthActionTypes.LOGOUT:
      return { ...state, token: '', user: null }
    case AuthActionTypes.REGISTER:
      return { ...state, isResigering: true }
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isResigering: false
      }
    case AuthActionTypes.REGISTER_FAIL:
      return {
        ...state,
        isResigering: false
      }
    default:
      return state
  }
}
