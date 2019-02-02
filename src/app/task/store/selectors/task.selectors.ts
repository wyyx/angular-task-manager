import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TaskFeatureState } from '..'
import { taskAdapter } from '../reducers/task.reducer'
import { getTaskListsByProjectId } from './task-list.selectors'

export const { selectAll, selectEntities, selectIds, selectTotal } = taskAdapter.getSelectors()

export const getTaskFeatureState = createFeatureSelector<TaskFeatureState>('task')

export const getTaskState = createSelector(
  getTaskFeatureState,
  state => state.tasks
)

export const getAllTasks = createSelector(
  getTaskState,
  selectAll
)

export const getTasksByTaskListId = (taskListId: string) =>
  createSelector(
    getAllTasks,
    tasks => tasks.filter(task => task.taskListId === taskListId)
  )

export const getTasksIsLoading = createSelector(
  getTaskFeatureState,
  state => state.tasks.isLoading
)
