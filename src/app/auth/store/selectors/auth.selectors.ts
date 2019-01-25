import { createSelector, createFeatureSelector } from '@ngrx/store'
import { AuthState } from '../reducers/auth.reducer'

export const getAuthState = createFeatureSelector<AuthState>('auth')

export const getLoggedIn = createSelector(
  getAuthState,
  state => !!state.user
)
