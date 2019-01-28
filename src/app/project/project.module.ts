import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProjectListComponent } from './project-list/project-list.component'
import { ProjectItemComponent } from './project-item/project-item.component'
import { InviteComponent } from './invite/invite.component'
import { ProjectRoutingModule } from './project-routing.module'
import { SharedModule } from '../shared/shared.module'
import { ProjectDialogComponent } from './project-dialog/project-dialog.component'
import { StoreModule } from '@ngrx/store'
import { projectFeatureReducers, projectFeatureEffects } from './store'
import { EffectsModule } from '@ngrx/effects'
import { ProjectEffects } from './store/effects/project.effects'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    StoreModule.forFeature('project', projectFeatureReducers),
    EffectsModule.forFeature(projectFeatureEffects)
  ],
  declarations: [
    ProjectListComponent,
    ProjectItemComponent,
    InviteComponent,
    ProjectDialogComponent
  ],
  entryComponents: [ProjectDialogComponent, InviteComponent]
})
export class ProjectModule {}
