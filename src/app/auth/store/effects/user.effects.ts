import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { UserService } from 'src/app/services/user.service'
import {
  UpdateUserAction,
  UpdateUserFailAction,
  UpdateUserSuccessAction,
  UserActionTypes
} from '../actions/user.actions'

@Injectable()
export class UserEffects {
  @Effect()
  updateUser$: Observable<any> = this.actions$.pipe(
    ofType<UpdateUserAction>(UserActionTypes.UPDATE_USER),
    map(action => action.payload),
    mergeMap(user =>
      this.userService.update(user).pipe(
        map(user => new UpdateUserSuccessAction({ id: user.id, changes: user })),
        catchError(() => of(new UpdateUserFailAction()))
      )
    )
  )

  constructor(private userService: UserService, private actions$: Actions) {}
}
