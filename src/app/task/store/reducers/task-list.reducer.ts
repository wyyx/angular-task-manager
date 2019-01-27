import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity'
import { TaskList } from 'src/app/domain/task-list.model'
import { TaskListActions, TaskListActionTypes } from '../actions/task-list.actions'

export interface TaskListState extends EntityState<TaskList> {}
export const taskListAdapter: EntityAdapter<TaskList> = createEntityAdapter()

const initialTaskListState = taskListAdapter.getInitialState()

export function taskListReducer(
  state = initialTaskListState,
  action: TaskListActions
): TaskListState {
  switch (action.type) {
    case TaskListActionTypes.LOAD_TASK_LISTS_SUCCESS:
      return taskListAdapter.addMany(action.payload, state)
    case TaskListActionTypes.LOAD_TASK_LISTS_FAIL:
      return state
    default:
      return state
  }
}
