import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { UserActionTypes, UserActions, UpdateUserAction } from '../actions/user.actions'
import { UserService } from 'src/app/services/user.service'
import { mergeMap, map } from 'rxjs/operators'

@Injectable()
export class UserEffects {
  @Effect({ dispatch: false })
  updateUser$: Observable<any> = this.actions$.pipe(
    ofType<UpdateUserAction>(UserActionTypes.UPDATE_USER),
    map(action => action.payload),
    mergeMap(user => this.userService.update(user))
  )

  constructor(private actions$: Actions, private userService: UserService) {}
}
