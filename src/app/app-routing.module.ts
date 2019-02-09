import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'projects',
    loadChildren: './project/project.module#ProjectModule'
  },
  {
    path: 'calendar',
    loadChildren: './my-calendar/my-calendar.module#MyCalendarModule'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
