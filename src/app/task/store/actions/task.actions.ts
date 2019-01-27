import { Action } from '@ngrx/store'
import { Task } from 'src/app/domain/task.model'

export enum TaskActionTypes {
  LOAD_TASKS = '[Task] load Tasks',
  LOAD_TASKS_SUCCESS = '[Task] load Tasks fail',
  LOAD_TASKS_FAIL = '[Task] load Tasks success'
}

// Load tasks
export class LoadTasksAction implements Action {
  readonly type = TaskActionTypes.LOAD_TASKS

  constructor(public payload: { taskListId: string }) {}
}

export class LoadTasksSuccessAction implements Action {
  readonly type = TaskActionTypes.LOAD_TASKS_SUCCESS

  constructor(public payload: Task[]) {}
}

export class LoadTasksFailAction implements Action {
  readonly type = TaskActionTypes.LOAD_TASKS_FAIL
}

export type TaskActions = LoadTasksAction | LoadTasksSuccessAction | LoadTasksFailAction
