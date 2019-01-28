import { Action } from '@ngrx/store'
import { Task } from 'src/app/domain/task.model'
import { Update } from '@ngrx/entity'

export enum TaskActionTypes {
  LOAD_TASKS = '[Task] load Tasks',
  LOAD_TASKS_SUCCESS = '[Task] load Tasks success',
  LOAD_TASKS_FAIL = '[Task] load Tasks fail',
  // Move taskList
  MOVE_TASKS = '[Task] move tasks',
  MOVE_TASKS_SUCCESS = '[Task] move tasks success',
  MOVE_TASKS_FAIL = '[Task] move tasks fail',
  // Add new task
  ADD_TASK = '[Task] add task',
  ADD_TASK_SUCCESS = '[Task] add task success',
  ADD_TASK_FAIL = '[Task] add task fail',
  // Update task
  UPDATE_TASK = '[Task] update task',
  UPDATE_TASK_SUCCESS = '[Task] update task success',
  UPDATE_TASK_FAIL = '[Task] update task fail'
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

// Add task
export class AddTaskAction implements Action {
  readonly type = TaskActionTypes.ADD_TASK

  constructor(public payload: Task) {}
}

export class AddTaskSuccessAction implements Action {
  readonly type = TaskActionTypes.ADD_TASK_SUCCESS

  constructor(public payload: Task) {}
}

export class AddTaskFailAction implements Action {
  readonly type = TaskActionTypes.ADD_TASK_FAIL
}

// Update task
export class UpdateTaskAction implements Action {
  readonly type = TaskActionTypes.UPDATE_TASK

  constructor(public payload: Update<Task>) {}
}

export class UpdateTaskSuccessAction implements Action {
  readonly type = TaskActionTypes.UPDATE_TASK_SUCCESS

  constructor(public payload: Update<Task>) {}
}

export class UpdateTaskFailAction implements Action {
  readonly type = TaskActionTypes.UPDATE_TASK_FAIL
}

export type TaskActions =
  | LoadTasksAction
  | LoadTasksSuccessAction
  | LoadTasksFailAction
  | MoveTasksAction
  | MoveTasksSuccessAction
  | MoveTasksFailAction
  | AddTaskAction
  | AddTaskSuccessAction
  | AddTaskFailAction
  | UpdateTaskAction
  | UpdateTaskSuccessAction
  | UpdateTaskFailAction
