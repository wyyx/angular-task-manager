import { createSelector, createFeatureSelector } from '@ngrx/store'
import { AuthFeatureState } from '..'

export const getAuthFeatureState = createFeatureSelector<AuthFeatureState>('auth')

export const getIsLoggedIn = createSelector(
  getAuthFeatureState,
  state => !!state.auth.user && !!state.auth.token
)

export const getUser = createSelector(
  getAuthFeatureState,
  state => state.auth.user
)

export const getIsRegistering = createSelector(
  getAuthFeatureState,
  state => state.auth.isResigering
)

export const getIsLogging = createSelector(
  getAuthFeatureState,
  state => state.auth.isLogging
)
