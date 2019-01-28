import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'
import { TaskService } from 'src/app/services/task.service'
import { AppState } from 'src/app/store'
import {
  LoadTasksAction,
  LoadTasksFailAction,
  LoadTasksSuccessAction,
  TaskActions,
  TaskActionTypes,
  MoveTasksAction,
  MoveTasksFailAction,
  MoveTasksSuccessAction
} from '../actions/task.actions'
import { LoadTaskListsAction } from '../actions/task-list.actions'

@Injectable()
export class TaskEffects {
  @Effect()
  loadTasks$: Observable<TaskActions> = this.actions$.pipe(
    ofType<LoadTasksAction>(TaskActionTypes.LOAD_TASKS),
    map(action => action.payload.taskListId),
    mergeMap(taskListId =>
      this.taskService.get(taskListId).pipe(
        map(tasks => new LoadTasksSuccessAction(tasks)),
        catchError(() => of(new LoadTasksFailAction()))
      )
    )
  )

  @Effect() moveTasks$: Observable<TaskActions> = this.actions$.pipe(
    ofType<MoveTasksAction>(TaskActionTypes.MOVE_TASKS),
    map(action => action.payload),
    mergeMap(({ sourceTaskListId, targetTaskListId }) =>
      this.taskService.moveAll(sourceTaskListId, targetTaskListId).pipe(
        map(() => new MoveTasksSuccessAction()),
        tap(() =>
          // Reload tasks of related taskLists
          [sourceTaskListId, targetTaskListId].forEach(taskListId =>
            this.store.dispatch(new LoadTasksAction({ taskListId }))
          )
        ),
        catchError(() => of(new MoveTasksFailAction()))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store<AppState>
  ) {}
}
