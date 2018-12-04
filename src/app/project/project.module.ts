import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProjectListComponent } from './project-list/project-list.component'
import { ProjectItemComponent } from './project-item/project-item.component'
import { InviteComponent } from './invite/invite.component'
import { NewProjectComponent } from './new-project/new-project.component'
import { ProjectRoutingModule } from './project-routing.module'
import { SharedModule } from '../shared/shared.module'
import { MyCustomMaterialModule } from '../my-custom-material/my-custom-material.module'

@NgModule({
	imports: [ CommonModule, SharedModule, ProjectRoutingModule, MyCustomMaterialModule ],
	declarations: [
		ProjectListComponent,
		ProjectItemComponent,
		InviteComponent,
		NewProjectComponent
	],
	entryComponents: [ NewProjectComponent, InviteComponent ]
})
export class ProjectModule {}
