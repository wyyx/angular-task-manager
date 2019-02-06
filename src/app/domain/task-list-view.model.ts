import { TaskView } from './task-view.model'

export interface TaskListView {
  id?: string
  name: string
  projectId: string
  order: number
  taskIds?: string[]
  tasks: TaskView[]
}
