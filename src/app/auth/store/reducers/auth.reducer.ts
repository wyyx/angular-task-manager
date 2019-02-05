import { AuthActions, AuthActionTypes } from '../actions/auth.actions'
import { User } from 'src/app/auth/models/user.model'

export interface AuthState {
  token: string
  user: User
  isResigering: boolean
}

const initialAuthState: AuthState = {
  token: '',
  user: null,
  isResigering: false
}

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return { ...state, ...action.payload }
    case AuthActionTypes.LOGIN_FAIL:
      return state
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
