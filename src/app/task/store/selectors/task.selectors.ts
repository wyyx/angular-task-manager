import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TaskFeatureState } from '..'
import { taskAdapter } from '../reducers/task.reducer'
import { getAllUsers } from 'src/app/auth/store/selectors/user.selector'
import { TaskView } from 'src/app/domain/task-view.model'
import { CalendarEvent } from 'calendar-utils'
import { EVENT_COLORS } from 'src/app/my-calendar/angular-calendar/data'

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

export const getAllEvents = createSelector(
  getAllTasks,
  tasks =>
    tasks.map(
      task =>
        ({
          start: new Date(task.reminder),
          end: new Date(task.dueDate),
          title: task.desc,
          color: EVENT_COLORS.red,
          // actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true
        } as CalendarEvent)
    )
)
