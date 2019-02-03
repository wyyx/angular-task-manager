import { routerReducer, RouterReducerState } from '@ngrx/router-store'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'
import { environment } from '../../environments/environment'
import { RouterStateUrl } from './custom-route-serializer'
import { resetState } from './reducers/reset-state.meta-reducer'

export interface AppState {
  router: RouterReducerState<RouterStateUrl>
}

export const appReducers: ActionReducerMap<AppState> = {
  router: routerReducer
}

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production
  ? [resetState, storeFreeze]
  : []

export const appEffects = []
