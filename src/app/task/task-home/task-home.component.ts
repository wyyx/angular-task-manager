import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { ActivatedRoute } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { uniq } from 'lodash'
import { Observable, Subject } from 'rxjs'
import { filter, map, mergeMap, take, takeUntil, tap } from 'rxjs/operators'
import { slideToRightAnim } from 'src/app/animations/route.anim'
import { NeedUsersAction } from 'src/app/auth/store/actions/user.actions'
import { getUser } from 'src/app/auth/store/selectors/auth.selectors'
import { DragData } from 'src/app/directive/drag-drop.service'
import { TaskListView } from 'src/app/domain/task-list-view.model'
import { TaskList } from 'src/app/domain/task-list.model'
import { Task } from 'src/app/domain/task.model'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { ContextMenuComponent } from 'src/app/shared/context-menu/context-menu.component'
import { AppState } from 'src/app/store'
import { ModifyTaskListNameComponent } from '../modify-task-list-name/modify-task-list-name.component'
import { MoveTaskComponent } from '../move-task/move-task.component'
import { NewTaskListComponent } from '../new-task-list/new-task-list.component'
import { NewTaskComponent, Priorities } from '../new-task/new-task.component'
import {
  AddTaskListAction,
  DeleteTaskListAction,
  NeedTaskListsAction,
  UpdateTaskListAction
} from '../store/actions/task-list.actions'
import {
  AddTaskAction,
  DeleteTaskAction,
  MoveTasksAction,
  UpdateTaskAction
} from '../store/actions/task.actions'
import {
  getNextOrderByProjectId,
  getTaskListViews,
  getTaskListViewsIsLoading
} from '../store/selectors/task-list.selectors'

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRightAnim]
})
export class TaskHomeComponent implements OnInit, OnDestroy {
  taskListViews$: Observable<TaskListView[]>
  kill$: Subject<any> = new Subject()
  projectId: string
  showMenu: boolean = false
  isLoading$: Observable<boolean>

  state

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('projectId')
    this.isLoading$ = this.store.pipe(select(getTaskListViewsIsLoading))
    this.store.dispatch(new NeedTaskListsAction({ projectId: this.projectId }))
    this.taskListViews$ = this.store.pipe(
      select(getTaskListViews(this.projectId)),
      tap(taskListViews => {
        let userIds: string[] = []
        // Get all userIds in all tasks
        taskListViews.forEach(taskListView => {
          userIds = userIds.concat(taskListView.tasks.map(task => task.ownerId))
        })
        // For avatars
        this.store.dispatch(new NeedUsersAction({ userIds: uniq(userIds) }))
      })
    )
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  onContextMenu(
    event: MouseEvent,
    rootMenu: ContextMenuComponent,
    currentItem: Task,
    currentList: TaskList
  ) {
    event.preventDefault()

    rootMenu.showMenu()
    rootMenu.setPosition(event.clientX, event.clientY)

    // Set rootMenu data
    this.taskListViews$
      .pipe(
        map(lists => lists.filter(list => list.id !== currentList.id)),
        filter(lists => lists.length > 0),
        tap(lists => (rootMenu.data = { currentItem, otherLists: lists })),
        take(1)
      )
      .subscribe()
  }

  deleteTask(task: Task) {
    this.store.dispatch(new DeleteTaskAction({ taskId: task.id }))
  }

  moveTo(task: Task, list: TaskList) {
    this.store.dispatch(
      new UpdateTaskAction({ id: task.id, changes: { ...task, taskListId: list.id } })
    )
  }

  openNewTaskDialog(list: TaskList) {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: { list, title: '新建任务' }
    })

    dialogRef
      .afterClosed()
      .pipe(
        filter(task => !!task),
        tap((newTask: Task) => this.store.dispatch(new AddTaskAction(newTask))),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  openEditTaskDialog(task: Task, list: TaskList) {
    // console.log('task', task)
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: { list, task, title: '编辑任务' }
    })

    dialogRef
      .afterClosed()
      .pipe(
        filter(task => !!task),
        tap((newTask: Task) =>
          this.store.dispatch(new UpdateTaskAction({ id: newTask.id, changes: newTask }))
        ),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  openMoveAllDialog(currentList: TaskListView) {
    const dialogRef = this.dialog.open(MoveTaskComponent, {
      data: {
        lists: this.taskListViews$.pipe(
          // Don't need to move tasks to self taskList
          map(lists => lists.filter(list => list.id !== currentList.id))
        )
      }
    })

    dialogRef
      .afterClosed()
      .pipe(
        tap(
          targetListId =>
            targetListId &&
            this.store.dispatch(
              new MoveTasksAction({
                sourceTaskListId: currentList.id,
                targetTaskListId: targetListId
              })
            )
        ),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  openDeleteTaskListDialog(list: TaskList) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除列表'
      }
    })

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.kill$),
        tap(ok => ok && this.store.dispatch(new DeleteTaskListAction({ taskListId: list.id })))
      )
      .subscribe()
  }

  openModifyListNameDialog({ tasks, ...taskList }: TaskListView) {
    const dialogRef = this.dialog.open(ModifyTaskListNameComponent, {
      data: {
        name: taskList.name
      }
    })

    dialogRef
      .afterClosed()
      .pipe(
        tap(
          newListName =>
            newListName &&
            this.store.dispatch(
              new UpdateTaskListAction({
                id: taskList.id,
                changes: { ...taskList, name: newListName }
              })
            )
        ),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  openNewTaskListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent)

    dialogRef
      .afterClosed()
      .pipe(
        filter(taskList => !!taskList),
        mergeMap(taskList =>
          this.store.pipe(
            select(getNextOrderByProjectId(this.projectId)),
            take(1),
            tap(v => console.log('[debug]', 'order', v)),
            tap(order =>
              this.store.dispatch(
                new AddTaskListAction({ ...taskList, projectId: this.projectId, order })
              )
            ),
            takeUntil(this.kill$)
          )
        )
      )
      .subscribe()
  }

  onDropped(dragData: DragData, targetList: TaskList) {
    if (dragData.tag === 'task-list' && dragData.data.id == targetList.id) {
      // If draged list drops to itself
      return
    }

    switch (dragData.tag) {
      case 'task-item':
        console.log('handling task-item')
        const task: Task = dragData.data

        this.store.dispatch(
          new UpdateTaskAction({ id: task.id, changes: { ...task, taskListId: targetList.id } })
        )
        break
      case 'task-list':
        console.log('handling task-list')
        const sourceList: TaskList = dragData.data

        // Update sourceList
        this.store.dispatch(
          new UpdateTaskListAction({
            id: sourceList.id,
            changes: { ...sourceList, order: targetList.order }
          })
        )

        // Update targetList
        this.store.dispatch(
          new UpdateTaskListAction({
            id: targetList.id,
            changes: { ...targetList, order: sourceList.order }
          })
        )
        break
    }
  }

  onQuickTask(desc: string, taskList: TaskList) {
    if (desc) {
      this.store
        .pipe(
          select(getUser),
          tap(user =>
            this.store.dispatch(
              new AddTaskAction({
                taskListId: taskList.id,
                desc,
                dueDate: new Date(),
                reminder: new Date(),
                completed: false,
                participantIds: [],
                ownerId: user.id,
                priority: Priorities.Normal
              })
            )
          ),
          takeUntil(this.kill$)
        )
        .subscribe()
    }
  }
}
