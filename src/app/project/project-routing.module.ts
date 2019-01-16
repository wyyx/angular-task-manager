import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ProjectListComponent } from './project-list/project-list.component'
import { TaskModule } from '../task/task.module'

const routes: Routes = [
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ProjectListComponent
      },
      {
        path: ':projectId',
        loadChildren: './../task/task.module#TaskModule'
      }
    ]
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
