import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity'
import { Task } from 'src/app/domain/task.model'
import { TaskActions, TaskActionTypes } from '../actions/task.actions'

export interface TaskState extends EntityState<Task> {}
export const taskAdapter: EntityAdapter<Task> = createEntityAdapter()

const initialTaskState = taskAdapter.getInitialState()

export function taskReducer(state = initialTaskState, action: TaskActions): TaskState {
  switch (action.type) {
    // Load tasks
    case TaskActionTypes.LOAD_TASKS_SUCCESS:
      return taskAdapter.upsertMany(action.payload, state)
    case TaskActionTypes.LOAD_TASKS_FAIL:
      return state
    // Add task
    case TaskActionTypes.ADD_TASK_SUCCESS:
      return taskAdapter.addOne(action.payload, state)
    case TaskActionTypes.ADD_TASK_FAIL:
      return state
    // Add task
    case TaskActionTypes.UPDATE_TASK_SUCCESS:
      return taskAdapter.updateOne(action.payload, state)
    case TaskActionTypes.UPDATE_TASK_FAIL:
      return state
    default:
      return state
  }
}
