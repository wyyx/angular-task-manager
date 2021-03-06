import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store'
import { TaskListView } from 'src/app/domain/task-list-view.model'
import { TaskFeatureState } from '..'
import { taskListAdapter } from '../reducers/task-list.reducer'
import { getAllTasks, getTasksIsLoading, getAllTaskViews } from './task.selectors'
import { max } from 'lodash'

export const { selectAll, selectEntities, selectIds, selectTotal } = taskListAdapter.getSelectors()

export const getTaskFeatureState = createFeatureSelector<TaskFeatureState>('task')

export const getTaskListState = createSelector(
  getTaskFeatureState,
  state => state.taskLists
)

export const getAllTaskLists = createSelector(
  getTaskListState,
  selectAll
)

export const getTaskListsByProjectId = (projectId: string) =>
  createSelector(
    getAllTaskLists,
    taskLists => taskLists.filter(taskList => taskList.projectId === projectId)
  )

export const getTaskListViews = (projectId: string): MemoizedSelector<object, TaskListView[]> =>
  createSelector(
    getTaskListsByProjectId(projectId),
    getAllTaskViews,
    (taskLists, tasks) =>
      taskLists.map(taskList => ({
        ...taskList,
        tasks: tasks.filter(task => task.taskListId === taskList.id)
      }))
  )

export const getTaskListsIsLoaded = (projectId: string) =>
  createSelector(
    getTaskListsByProjectId(projectId),
    taskLists => !!taskLists && taskLists.length > 0
  )

export const getTaskListsIsLoading = createSelector(
  getTaskFeatureState,
  state => state.taskLists.isLoading
)

export const getTaskListViewsIsLoading = createSelector(
  getTaskListsIsLoading,
  getTasksIsLoading,
  (listLoading, taskLoading) => (listLoading || taskLoading ? true : false)
)

export const getNextOrderByProjectId = (projectId: string) =>
  createSelector(
    getTaskListsByProjectId(projectId),
    taskLists => {
      let maxOrder = max(taskLists.map(list => list.order))
      maxOrder = maxOrder ? maxOrder : 0

      return maxOrder + 1
    }
  )
