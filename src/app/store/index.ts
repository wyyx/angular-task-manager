import { routerReducer, RouterReducerState } from '@ngrx/router-store'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'
import { environment } from '../../environments/environment'
import { RouterStateUrl } from './custom-route-serializer'
import { UserEffects } from './effects/user.effects'

export interface AppState {
  router: RouterReducerState<RouterStateUrl>
}

export const appReducers: ActionReducerMap<AppState> = {
  router: routerReducer
}

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : []

export const appEffects = [UserEffects]
