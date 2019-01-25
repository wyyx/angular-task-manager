import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core'
import { MatDialog } from '@angular/material'
import { NewTaskComponent } from '../new-task/new-task.component'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { ModifyTaskListNameComponent } from '../modify-task-list-name/modify-task-list-name.component'
import { EditTaskComponent } from '../edit-task/edit-task.component'
import { NewTaskListComponent } from '../new-task-list/new-task-list.component'
import { slideToRight } from 'src/app/animations/route.anim'
import { DragData } from 'src/app/directive/drag-drop.service'
import { TaskListService } from 'src/app/services/task-list.service'
import { TaskList } from 'src/app/domain/task-list.model'
import { ActivatedRoute } from '@angular/router'
import { switchMap, mergeMap, map, take, takeUntil } from 'rxjs/operators'
import { TaskService } from 'src/app/services/task.service'
import { from, Subscription, never, Subject, interval, Observable } from 'rxjs'
import { MoveTaskComponent } from '../move-task/move-task.component'

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit, OnDestroy {
  taskLists = []
  kill$: Subject<any> = new Subject()
  test$: Observable<any>

  @HostBinding('@routeAnim') state
  constructor(
    public dialog: MatDialog,
    private taskListService: TaskListService,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((p) => {
          console.log(p.get('projectId'))

          return this.taskListService.get(p.get('projectId'))
        }),
        mergeMap((taskLists) => from(taskLists)),
        mergeMap((taskList) =>
          this.taskService.get(taskList.id).pipe(map((tasks) => ({ ...taskList, tasks })))
        ),
        takeUntil(this.kill$)
      )
      .subscribe((taskList) => this.taskLists.push(taskList))
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  openNewTaskDialog() {
    this.dialog.open(NewTaskComponent)
  }

  openMoveAllDialog(currentList) {
    const dialogRef = this.dialog.open(MoveTaskComponent, {
      data: { lists: this.taskLists.filter((list) => list.id != currentList.id) }
    })

    dialogRef
      .afterClosed()
      .pipe(
        mergeMap((targetListId) => {
          if (targetListId) {
            // Update view
            this.taskLists.forEach((list) => {
              if (list.id == targetListId) {
                list.tasks = list.tasks.concat(currentList.tasks)
                // Update task.taskListId to targetListId
                list.tasks.forEach((task) => (task.taskListId = targetListId))
                currentList.tasks = []
              }
            })

            // Update server
            return this.taskService.moveAll(currentList.id, targetListId)
          } else {
            return never()
          }
        }),
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

    dialogRef.afterClosed().subscribe((result) => {
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

  openEditTaskDialog(task) {
    this.dialog.open(EditTaskComponent, {
      data: { task: task }
    })
  }

  openNewTaskListDialog() {
    this.dialog.open(NewTaskListComponent)
  }

  onDropped(dragData: DragData, targetList) {
    if (dragData.tag == 'task-list' && dragData.data.id == targetList.id) {
      // If draged to itself
      return
    }

    console.log('onDropped()', dragData)
    switch (dragData.tag) {
      case 'task-item':
        console.log('handling task-item')
        // Update view
        // Add taskItem to targetList
        const taskItem = dragData.data
        targetList.tasks.push(taskItem)

        // Remove taskItem from sourceList
        const sourceListIndex = this.taskLists.findIndex((list) => list.id == taskItem.taskListId)
        const sourceItemIndex = this.taskLists[sourceListIndex].tasks.findIndex(
          (task) => task.id == taskItem.id
        )
        this.taskLists[sourceListIndex].tasks.splice(sourceItemIndex, 1)

        // Update taskItem's taskListId in client
        taskItem.taskListId = targetList.id

        // Update server
        this.taskService
          .move(taskItem.id, targetList.id)
          .pipe(takeUntil(this.kill$))
          .subscribe()
        break
      case 'task-list':
        console.log('handling task-list')
        const sourceList = dragData.data
        this.taskListService
          .switchOrder(sourceList, targetList)
          .pipe(takeUntil(this.kill$))
          .subscribe()
        this.switchOrder(sourceList, targetList)
        break
    }
  }

  onQuickTask(desc: string) {
    console.log('desc', desc)
  }

  switchOrder(sourceList: TaskList, targetList: TaskList) {
    const sourceOrder = sourceList.order
    const targetOrder = targetList.order

    this.taskLists.forEach((list) => {
      list.id == sourceList.id ? (list.order = targetOrder) : null
      list.id == targetList.id ? (targetList.order = sourceOrder) : null
    })
  }
}
