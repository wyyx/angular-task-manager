import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, filter, map, mapTo, mergeMap, tap, withLatestFrom } from 'rxjs/operators'
import { getIsLoggedIn } from 'src/app/auth/store/selectors/auth.selectors'
import { TaskListService } from 'src/app/services/task-list.service'
import { TaskService } from 'src/app/services/task.service'
import { AppState } from 'src/app/store'
import {
  AddTaskListAction,
  AddTaskListFailAction,
  AddTaskListSuccessAction,
  DeleteTaskListAction,
  DeleteTaskListFailAction,
  DeleteTaskListSuccessAction,
  LoadTaskListsAction,
  LoadTaskListsFailAction,
  LoadTaskListsSuccessAction,
  NeedTaskListsAction,
  TaskListActions,
  TaskListActionTypes,
  UpdateTaskListAction,
  UpdateTaskListFailAction,
  UpdateTaskListSuccessAction
} from '../actions/task-list.actions'
import { LoadTasksAction } from '../actions/task.actions'
import { getTaskListsIsLoaded } from '../selectors/task-list.selectors'

@Injectable()
export class TaskListEffects {
  @Effect() needTaskLists$: Observable<TaskListActions> = this.actions$.pipe(
    ofType<NeedTaskListsAction>(TaskListActionTypes.NEED_TASK_LISTS),
    map(action => action.payload.projectId),
    mergeMap(projectId =>
      this.store.pipe(
        select(getTaskListsIsLoaded(projectId)),
        withLatestFrom(this.store.pipe(select(getIsLoggedIn))),
        filter(([loaded, loggedIn]) => loggedIn && !loaded),
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

  @Effect() addTaskList$: Observable<TaskListActions> = this.actions$.pipe(
    ofType<AddTaskListAction>(TaskListActionTypes.ADD_TASK_LIST),
    map(action => action.payload),
    mergeMap(taskList =>
      this.taskListService.add(taskList).pipe(
        map(taskList => new AddTaskListSuccessAction(taskList)),
        catchError(() => of(new AddTaskListFailAction()))
      )
    )
  )

  @Effect() deleteTaskList$: Observable<TaskListActions> = this.actions$.pipe(
    ofType<DeleteTaskListAction>(TaskListActionTypes.DELETE_TASK_LIST),
    map(action => action.payload.taskListId),
    mergeMap(taskListId =>
      this.taskListService.delete(taskListId).pipe(
        map(taskListId => new DeleteTaskListSuccessAction({ taskListId })),
        catchError(() => of(new DeleteTaskListFailAction()))
      )
    )
  )

  @Effect() updateTaskList$: Observable<TaskListActions> = this.actions$.pipe(
    ofType<UpdateTaskListAction>(TaskListActionTypes.UPDATE_TASK_LIST),
    map(action => action.payload),
    mergeMap(taskList =>
      this.taskListService.update(taskList).pipe(
        map(
          resTaskList =>
            new UpdateTaskListSuccessAction({ id: resTaskList.id, changes: resTaskList })
        ),
        catchError(() => of(new UpdateTaskListFailAction()))
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
