import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MyCalendarRoutingModule } from './my-calendar-routing.module'

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap'
import { CalendarModule } from 'angular-calendar'
import { FlatpickrModule } from 'angularx-flatpickr'
import { ContextMenuModule } from 'ngx-contextmenu'
import { AngularCalendarComponent } from './angular-calendar/angular-calendar.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [AngularCalendarComponent],
  imports: [
    SharedModule,
    MyCalendarRoutingModule,
    NgbModalModule,
    FlatpickrModule,
    CalendarModule,
    ContextMenuModule
  ]
})
export class MyCalendarModule {}
