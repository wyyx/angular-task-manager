import { TaskState, taskReducer } from './reducers/task.reducer'
import { TaskListState, taskListReducer } from './reducers/task-list.reducer'
import { ActionReducerMap } from '@ngrx/store'
import { TaskEffects } from './effects/task.effects'
import { TaskListEffects } from './effects/task-list.effects'

export interface TaskFeatureState {
  tasks: TaskState
  taskLists: TaskListState
}

export const taskFeatureReducers: ActionReducerMap<TaskFeatureState> = {
  tasks: taskReducer,
  taskLists: taskListReducer
}

export const taskFeatureEffects = [TaskEffects, TaskListEffects]
