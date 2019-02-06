import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, filter, map, mapTo, mergeMap, tap } from 'rxjs/operators'
import { UserService } from 'src/app/services/user.service'
import { AppState } from 'src/app/store'
import {
  LoadUsersAction,
  LoadUsersFailAction,
  LoadUsersSuccessAction,
  NeedUsersAction,
  UpdateUserAction,
  UpdateUserFailAction,
  UpdateUserSuccessAction,
  UserActions,
  UserActionTypes
} from '../actions/user.actions'
import { getUserIdsNotExist } from '../selectors/user.selector'

@Injectable()
export class UserEffects {
  @Effect()
  needUser$: Observable<UserActions> = this.actions$.pipe(
    ofType<NeedUsersAction>(UserActionTypes.NEED_USERS),
    map(action => action.payload.userIds),
    mergeMap(userIds =>
      this.store.pipe(
        select(getUserIdsNotExist(userIds)),
        // tap(v => console.log('[debug]', 'getUserIdsNotExist(userIds)', v)),
        filter(notExistUserIds => notExistUserIds.length > 0),
        map(notExistUserIds => new LoadUsersAction({ userIds: notExistUserIds }))
      )
    )
  )

  @Effect()
  loadUser$: Observable<UserActions> = this.actions$.pipe(
    ofType<LoadUsersAction>(UserActionTypes.LOAD_USERS),
    map(action => action.payload.userIds),
    mergeMap(userIds =>
      this.userService.getByIds(userIds).pipe(
        map(users => new LoadUsersSuccessAction(users)),
        catchError(() => of(new LoadUsersFailAction()))
      )
    )
  )

  @Effect()
  updateUser$: Observable<UserActions> = this.actions$.pipe(
    ofType<UpdateUserAction>(UserActionTypes.UPDATE_USER),
    map(action => action.payload),
    mergeMap(user =>
      this.userService.update(user).pipe(
        map(user => new UpdateUserSuccessAction({ id: user.id, changes: user })),
        catchError(() => of(new UpdateUserFailAction()))
      )
    )
  )

  constructor(
    private userService: UserService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
}
