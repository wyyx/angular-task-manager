import { routerReducer, RouterReducerState } from '@ngrx/router-store'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'
import { environment } from '../../environments/environment'
import { RouterStateUrl } from './custom-route-serializer'

export interface AppState {
  router: RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : []
