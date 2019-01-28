import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, filter, map, mapTo, mergeMap, tap } from 'rxjs/operators'
import { TaskListService } from 'src/app/services/task-list.service'
import { AppState } from 'src/app/store'
import {
  LoadTaskListsAction,
  LoadTaskListsFailAction,
  LoadTaskListsSuccessAction,
  NeedTaskListsAction,
  TaskListActions,
  TaskListActionTypes
} from '../actions/task-list.actions'
import { LoadTasksAction } from '../actions/task.actions'
import { getTaskListsIsLoaded } from '../selectors/task-list.selectors'
import { TaskService } from 'src/app/services/task.service'

@Injectable()
export class TaskListEffects {
  @Effect() needTaskLists$: Observable<TaskListActions> = this.actions$.pipe(
    ofType<NeedTaskListsAction>(TaskListActionTypes.NEED_TASK_LISTS),
    map(action => action.payload.projectId),
    mergeMap(projectId =>
      this.store.pipe(
        select(getTaskListsIsLoaded(projectId)),
        filter(loaded => !loaded),
        mapTo(new LoadTaskListsAction({ projectId }))
      )
    )
  )

  @Effect() loadTaskLists$: Observable<TaskListActions> = this.actions$.pipe(
    ofType<LoadTaskListsAction>(TaskListActionTypes.LOAD_TASK_LISTS),
    map(action => action.payload.projectId),
    mergeMap(projectId =>
      this.taskListService.get(projectId).pipe(
        tap(taskLists =>
          taskLists.forEach(taskList =>
            this.store.dispatch(new LoadTasksAction({ taskListId: taskList.id }))
          )
        ),
        map(taskLists => new LoadTaskListsSuccessAction(taskLists)),
        catchError(() => of(new LoadTaskListsFailAction()))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private taskListService: TaskListService,
    private taskService: TaskService,
    private store: Store<AppState>
  ) {}
}
