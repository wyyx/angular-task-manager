import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { never, Observable, Subject } from 'rxjs'
import { mergeMap, takeUntil, filter, map, tap } from 'rxjs/operators'
import { slideToRightAnim } from 'src/app/animations/route.anim'
import { TaskListService } from 'src/app/services/task-list.service'
import { TaskService } from 'src/app/services/task.service'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { AppState } from 'src/app/store'
import { ModifyTaskListNameComponent } from '../modify-task-list-name/modify-task-list-name.component'
import { MoveTaskComponent } from '../move-task/move-task.component'
import { NewTaskListComponent } from '../new-task-list/new-task-list.component'
import { NewTaskComponent } from '../new-task/new-task.component'
import { NeedTaskListsAction } from '../store/actions/task-list.actions'
import { TaskListView } from 'src/app/domain/task-list-view.model'
import { getTaskListViews } from '../store/selectors/task-list.selectors'
import { DragData } from 'src/app/directive/drag-drop.service'
import { TaskList } from 'src/app/domain/task-list.model'
import { MoveTasksAction, AddTaskAction, UpdateTaskAction } from '../store/actions/task.actions'
import { Task } from 'src/app/domain/task.model'

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

  @HostBinding('@slideToRightAnim') state
  constructor(
    public dialog: MatDialog,
    private taskListService: TaskListService,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('projectId')
    this.store.dispatch(new NeedTaskListsAction({ projectId: this.projectId }))
    this.taskListViews$ = this.store.pipe(select(getTaskListViews(this.projectId)))
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
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

  openEditTaskDialog(list: TaskList, task: Task) {
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

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除列表'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('deleteList:', result)
    })
  }

  openModifyListNameDialog(name: string) {
    this.dialog.open(ModifyTaskListNameComponent, {
      data: {
        name: name
      }
    })
  }

  openNewTaskListDialog() {
    this.dialog.open(NewTaskListComponent)
  }

  onDropped(dragData: DragData, targetList) {
    // if (dragData.tag == 'task-list' && dragData.data.id == targetList.id) {
    //   // If draged to itself
    //   return
    // }
    // console.log('onDropped()', dragData)
    // switch (dragData.tag) {
    //   case 'task-item':
    //     console.log('handling task-item')
    //     // Update view
    //     // Add taskItem to targetList
    //     const taskItem = dragData.data
    //     targetList.tasks.push(taskItem)
    //     // Remove taskItem from sourceList
    //     const sourceListIndex = this.taskLists.findIndex(list => list.id == taskItem.taskListId)
    //     const sourceItemIndex = this.taskLists[sourceListIndex].tasks.findIndex(
    //       task => task.id == taskItem.id
    //     )
    //     this.taskLists[sourceListIndex].tasks.splice(sourceItemIndex, 1)
    //     // Update taskItem's taskListId in client
    //     taskItem.taskListId = targetList.id
    //     // Update server
    //     this.taskService
    //       .move(taskItem.id, targetList.id)
    //       .pipe(takeUntil(this.kill$))
    //       .subscribe()
    //     break
    //   case 'task-list':
    //     console.log('handling task-list')
    //     const sourceList = dragData.data
    //     this.taskListService
    //       .switchOrder(sourceList, targetList)
    //       .pipe(takeUntil(this.kill$))
    //       .subscribe()
    //     this.switchOrder(sourceList, targetList)
    //     break
    // }
  }

  onQuickTask(desc: string) {
    console.log('desc', desc)
  }

  switchOrder(sourceList: TaskList, targetList: TaskList) {
    // const sourceOrder = sourceList.order
    // const targetOrder = targetList.order
    // this.taskLists.forEach(list => {
    //   list.id == sourceList.id ? (list.order = targetOrder) : null
    //   list.id == targetList.id ? (targetList.order = sourceOrder) : null
    // })
  }
}
