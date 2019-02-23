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
  ViewContainerRef,
  HostBinding
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
import { slideToRightAnim } from 'src/app/animations/route.anim'

@Component({
  selector: 'app-angular-calendar',
  templateUrl: './angular-calendar.component.html',
  styleUrls: ['./angular-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideToRightAnim]
})
export class AngularCalendarComponent implements OnInit {
  kill$: Subject<any> = new Subject()

  @HostBinding('@slideToRightAnim') state

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
  events: CalendarEvent[] = []
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
