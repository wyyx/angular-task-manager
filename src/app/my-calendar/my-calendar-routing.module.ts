import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AngularCalendarComponent } from './angular-calendar/angular-calendar.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'month',
        component: AngularCalendarComponent
      },
      {
        path: 'week',
        component: AngularCalendarComponent
      },
      {
        path: 'day',
        component: AngularCalendarComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCalendarRoutingModule {}
