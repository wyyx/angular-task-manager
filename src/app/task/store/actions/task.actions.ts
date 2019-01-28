import { Action } from '@ngrx/store'
import { Task } from 'src/app/domain/task.model'

export enum TaskActionTypes {
  LOAD_TASKS = '[Task] load Tasks',
  LOAD_TASKS_SUCCESS = '[Task] load Tasks success',
  LOAD_TASKS_FAIL = '[Task] load Tasks fail',
  // Move taskList
  MOVE_TASKS = '[Task] move tasks',
  MOVE_TASKS_SUCCESS = '[Task] move tasks success',
  MOVE_TASKS_FAIL = '[Task] move tasks fail'
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

export class MoveTasksAction implements Action {
  readonly type = TaskActionTypes.MOVE_TASKS

  constructor(public payload: { sourceTaskListId: string; targetTaskListId: string }) {}
}

export class MoveTasksSuccessAction implements Action {
  readonly type = TaskActionTypes.MOVE_TASKS_SUCCESS
}

export class MoveTasksFailAction implements Action {
  readonly type = TaskActionTypes.MOVE_TASKS_FAIL
}

export type TaskActions =
  | LoadTasksAction
  | LoadTasksSuccessAction
  | LoadTasksFailAction
  | MoveTasksAction
  | MoveTasksSuccessAction
  | MoveTasksFailAction
