import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity'
import { TaskList } from 'src/app/domain/task-list.model'
import { TaskListActions, TaskListActionTypes } from '../actions/task-list.actions'

export interface TaskListState extends EntityState<TaskList> {
  isLoading: boolean
}
export const taskListAdapter: EntityAdapter<TaskList> = createEntityAdapter()

const initialTaskListState = taskListAdapter.getInitialState({
  isLoading: false
})

export function taskListReducer(
  state = initialTaskListState,
  action: TaskListActions
): TaskListState {
  switch (action.type) {
    case TaskListActionTypes.LOAD_TASK_LISTS:
      return { ...state, isLoading: true }
    case TaskListActionTypes.LOAD_TASK_LISTS_SUCCESS:
      return taskListAdapter.upsertMany(action.payload, { ...state, isLoading: false })
    case TaskListActionTypes.LOAD_TASK_LISTS_FAIL:
      return { ...state, isLoading: false }
    case TaskListActionTypes.ADD_TASK_LIST_SUCCESS:
      return taskListAdapter.addOne(action.payload, state)
    case TaskListActionTypes.DELETE_TASK_LIST_SUCCESS:
      return taskListAdapter.removeOne(action.payload.taskListId, state)
    case TaskListActionTypes.UPDATE_TASK_LIST_SUCCESS:
      return taskListAdapter.updateOne(action.payload, state)
    default:
      return state
  }
}
