import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ProjectListComponent } from './project-list/project-list.component'
import { AuthGuard } from '../auth/guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProjectListComponent
      },
      {
        path: ':projectId',
        loadChildren: './../task/task.module#TaskModule'
      }
    ],
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
