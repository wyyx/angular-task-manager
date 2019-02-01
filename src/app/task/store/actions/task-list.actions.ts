import { Action } from '@ngrx/store'
import { TaskList } from 'src/app/domain/task-list.model'
import { Update } from '@ngrx/entity'

export enum TaskListActionTypes {
  // Load taskLists
  NEED_TASK_LISTS = '[Task] need taskLists',
  LOAD_TASK_LISTS = '[Task] load taskLists',
  LOAD_TASK_LISTS_SUCCESS = '[Task] load taskLists success',
  LOAD_TASK_LISTS_FAIL = '[Task] load taskLists fail',
  // Add taskList
  ADD_TASK_LIST = '[Task] add taskList',
  ADD_TASK_LIST_SUCCESS = '[Task] add taskList success',
  ADD_TASK_LIST_FAIL = '[Task] add taskList fail',
  // Delete taskList
  DELETE_TASK_LIST = '[Task] delete taskList',
  DELETE_TASK_LIST_SUCCESS = '[Task] delete taskList success',
  DELETE_TASK_LIST_FAIL = '[Task] delete taskList fail',
  // Update taskList
  UPDATE_TASK_LIST = '[Task] update taskList',
  UPDATE_TASK_LIST_SUCCESS = '[Task] update taskList success',
  UPDATE_TASK_LIST_FAIL = '[Task] update taskList fail'
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

// Add taskList
export class AddTaskListAction implements Action {
  readonly type = TaskListActionTypes.ADD_TASK_LIST

  constructor(public payload: TaskList) {}
}

export class AddTaskListSuccessAction implements Action {
  readonly type = TaskListActionTypes.ADD_TASK_LIST_SUCCESS

  constructor(public payload: TaskList) {}
}

export class AddTaskListFailAction implements Action {
  readonly type = TaskListActionTypes.ADD_TASK_LIST_FAIL
}

// Delete taskList
export class DeleteTaskListAction implements Action {
  readonly type = TaskListActionTypes.DELETE_TASK_LIST

  constructor(public payload: { taskListId: string }) {}
}

export class DeleteTaskListSuccessAction implements Action {
  readonly type = TaskListActionTypes.DELETE_TASK_LIST_SUCCESS

  constructor(public payload: { taskListId: string }) {}
}

export class DeleteTaskListFailAction implements Action {
  readonly type = TaskListActionTypes.DELETE_TASK_LIST_FAIL
}

// Update taskList
export class UpdateTaskListAction implements Action {
  readonly type = TaskListActionTypes.UPDATE_TASK_LIST

  constructor(public payload: Update<TaskList>) {}
}

export class UpdateTaskListSuccessAction implements Action {
  readonly type = TaskListActionTypes.UPDATE_TASK_LIST_SUCCESS

  constructor(public payload: Update<TaskList>) {}
}

export class UpdateTaskListFailAction implements Action {
  readonly type = TaskListActionTypes.UPDATE_TASK_LIST_FAIL
}

export type TaskListActions =
  | NeedTaskListsAction
  | LoadTaskListsAction
  | LoadTaskListsSuccessAction
  | LoadTaskListsFailAction
  | AddTaskListAction
  | AddTaskListSuccessAction
  | AddTaskListFailAction
  | DeleteTaskListAction
  | DeleteTaskListSuccessAction
  | DeleteTaskListFailAction
  | UpdateTaskListAction
  | UpdateTaskListSuccessAction
  | UpdateTaskListFailAction
