import { TaskListState as TaskListsState, taskListReducer } from './reducers/task-list.reducer'
import { ActionReducerMap } from '@ngrx/store'
import { TaskEffects } from './effects/task.effects'
import { TaskListEffects } from './effects/task-list.effects'
import { taskReducer, TaskState } from './reducers/task.reducer'

export interface TaskFeatureState {
  tasks: TaskState
  taskLists: TaskListsState
}

export const taskFeatureReducers: ActionReducerMap<TaskFeatureState> = {
  tasks: taskReducer,
  taskLists: taskListReducer
}

export const taskFeatureEffects = [TaskEffects, TaskListEffects]
