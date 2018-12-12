import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TaskHomeComponent } from './task-home/task-home.component'
import { TaskListComponent } from './task-list/task-list.component'
import { TaskItemComponent } from './task-item/task-item.component'
import { TaskHeaderComponent } from './task-header/task-header.component'
import { TaskRoutingModule } from './task-routing.module'
import { NewTaskComponent } from './new-task/new-task.component'
import { CopyTaskComponent } from './copy-task/copy-task.component'
import { SharedModule } from '../shared/shared.module'
import { ModifyTaskListNameComponent } from './modify-task-list-name/modify-task-list-name.component'
import { EditTaskComponent } from './edit-task/edit-task.component'
import { NewTaskListComponent } from './new-task-list/new-task-list.component';
import { QuickTaskComponent } from './quick-task/quick-task.component'

@NgModule({
	imports: [ CommonModule, TaskRoutingModule, SharedModule ],
	declarations: [
		TaskHomeComponent,
		TaskListComponent,
		TaskItemComponent,
		TaskHeaderComponent,
		NewTaskComponent,
		CopyTaskComponent,
		ModifyTaskListNameComponent,
		EditTaskComponent,
		NewTaskListComponent,
		QuickTaskComponent
	],
	entryComponents: [
		NewTaskComponent,
		CopyTaskComponent,
		ModifyTaskListNameComponent,
		EditTaskComponent,
		NewTaskListComponent
	]
})
export class TaskModule {}
