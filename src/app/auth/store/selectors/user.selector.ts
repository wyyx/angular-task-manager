import { createSelector, createFeatureSelector } from '@ngrx/store'
import { AuthFeatureState } from '..'
import { userAdapter } from '../reducers/user.reducer'
const { selectAll } = userAdapter.getSelectors()

export const getAuthFeatureState = createFeatureSelector<AuthFeatureState>('auth')

export const getUsersState = createSelector(
  getAuthFeatureState,
  state => state.users
)

export const getUserById = (userId: string) =>
  createSelector(
    getAuthFeatureState,
    state => state.users.entities[userId]
  )

// Filter exist users
export const getUserIdsNotExist = (userIds: string[]) =>
  createSelector(
    getAuthFeatureState,
    state => userIds.filter(id => !(state.users.ids as string[]).includes(id))
  )

export const getAllUsers = createSelector(
  getUsersState,
  selectAll
)
