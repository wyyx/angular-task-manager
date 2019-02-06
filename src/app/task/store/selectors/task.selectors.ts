import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TaskFeatureState } from '..'
import { taskAdapter } from '../reducers/task.reducer'
import { getAllUsers } from 'src/app/auth/store/selectors/user.selector'
import { TaskView } from 'src/app/domain/task-view.model'

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

export const getAllTaskViews = createSelector(
  getAllTasks,
  getAllUsers,
  (tasks, users) =>
    tasks.map(
      task =>
        ({
          ...task,
          avatar: users.filter(user => user.id === task.ownerId).map(user => user.avatar)[0]
        } as TaskView)
    )
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
