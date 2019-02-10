import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  SystemJsNgModuleLoader,
  NgModuleFactory,
  Injector,
  ViewContainerRef
} from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar'
import {
  addDays,
  addHours,
  endOfDay,
  endOfMonth,
  isSameDay,
  isSameMonth,
  startOfDay,
  subDays
} from 'date-fns'
import { Subject, Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { ActivatedRouteSnapshot, ActivatedRoute, UrlSegment } from '@angular/router'
import { getAllEvents } from 'src/app/task/store/selectors/task.selectors'
import { EVENT_COLORS } from './data'
import { getAllProjects } from 'src/app/project/store/selectors/projects.selectors'
import { map, tap, takeUntil } from 'rxjs/operators'
import { NeedTaskListsAction } from 'src/app/task/store/actions/task-list.actions'

@Component({
  selector: 'app-angular-calendar',
  templateUrl: './angular-calendar.component.html',
  styleUrls: ['./angular-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularCalendarComponent implements OnInit {
  kill$: Subject<any> = new Subject()

  @ViewChild('modalContent') modalContent: TemplateRef<any>
  view: CalendarView = CalendarView.Month
  CalendarView = CalendarView
  viewDate: Date = new Date()
  modalData: {
    action: string
    event: CalendarEvent
  }
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event)
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event)
        this.handleEvent('Deleted', event)
      }
    }
  ]
  refresh: Subject<any> = new Subject()
  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: EVENT_COLORS.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: EVENT_COLORS.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: EVENT_COLORS.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: EVENT_COLORS.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ]
  activeDayIsOpen: boolean = true
  events$: Observable<CalendarEvent[]>

  constructor(
    private modal: NgbModal,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // Load all tasks
    this.store
      .pipe(
        select(getAllProjects),
        tap(projects =>
          projects.forEach(p => this.store.dispatch(new NeedTaskListsAction({ projectId: p.id })))
        ),
        takeUntil(this.kill$)
      )
      .subscribe()

    const path = this.activatedRoute.snapshot.url[0]['path']
    switch (path) {
      case CalendarView.Month:
        this.view = CalendarView.Month
        break
      case CalendarView.Week:
        this.view = CalendarView.Week
        break
      case CalendarView.Day:
        this.view = CalendarView.Day
        break
      default:
        break
    }

    this.events$ = this.store.pipe(select(getAllEvents))
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false
      } else {
        this.activeDayIsOpen = true
      }
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart
    event.end = newEnd
    this.handleEvent('Dropped or resized', event)
    this.refresh.next()
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action }
    this.modal.open(this.modalContent, { size: 'lg' })
  }

  addEvent(date: Date): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(date || new Date()),
      end: endOfDay(date || new Date()),
      color: EVENT_COLORS.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    })
    this.refresh.next()
  }

  deleteEvent() {}
}
