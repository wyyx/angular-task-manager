import { ActionReducer } from '@ngrx/store'
import { AuthActionTypes } from '../../auth/store/actions/auth.actions'

export function resetState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    if (action.type === AuthActionTypes.LOGOUT) {
      console.log('reset appState')
      return reducer(undefined, action)
    }

    return reducer(state, action)
  }
}
