import { Action } from '@ngrx/store'
import { TaskList } from 'src/app/domain/task-list.model'

export enum TaskListActionTypes {
  // Load taskLists
  NEED_TASK_LISTS = '[Task] need taskLists',
  LOAD_TASK_LISTS = '[Task] load taskLists',
  LOAD_TASK_LISTS_SUCCESS = '[Task] load taskLists success',
  LOAD_TASK_LISTS_FAIL = '[Task] load taskLists fail'
}

export class NeedTaskListsAction implements Action {
  readonly type = TaskListActionTypes.NEED_TASK_LISTS

  constructor(public payload: { projectId: string }) {}
}

// Load taskLists
export class LoadTaskListsAction implements Action {
  readonly type = TaskListActionTypes.LOAD_TASK_LISTS

  constructor(public payload: { projectId: string }) {}
}

export class LoadTaskListsSuccessAction implements Action {
  readonly type = TaskListActionTypes.LOAD_TASK_LISTS_SUCCESS

  constructor(public payload: TaskList[]) {}
}

export class LoadTaskListsFailAction implements Action {
  readonly type = TaskListActionTypes.LOAD_TASK_LISTS_FAIL
}

export type TaskListActions =
  | NeedTaskListsAction
  | LoadTaskListsAction
  | LoadTaskListsSuccessAction
  | LoadTaskListsFailAction
