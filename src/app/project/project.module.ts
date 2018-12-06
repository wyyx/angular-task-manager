import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProjectListComponent } from './project-list/project-list.component'
import { ProjectItemComponent } from './project-item/project-item.component'
import { InviteComponent } from './invite/invite.component'
import { NewProjectComponent } from './new-project/new-project.component'
import { ProjectRoutingModule } from './project-routing.module'
import { SharedModule } from '../shared/shared.module'
import { EditProjectComponent } from './edit-project/edit-project.component'

@NgModule({
	imports: [ CommonModule, SharedModule, ProjectRoutingModule, SharedModule ],
	declarations: [
		ProjectListComponent,
		ProjectItemComponent,
		InviteComponent,
		NewProjectComponent,
		EditProjectComponent
	],
	entryComponents: [ NewProjectComponent, InviteComponent, EditProjectComponent ]
})
export class ProjectModule {}
