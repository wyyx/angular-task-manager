import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core'
import { itemAnim } from 'src/app/animations/item.anim'
import { Task } from 'src/app/domain/task.model'
import { MatCheckbox, MatCheckboxChange } from '@angular/material'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { UpdateTaskAction } from '../store/actions/task.actions'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnim]
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task
  avatar: string

  itemState = 'out'
  @HostListener('mouseleave')
  onMouseLeave() {
    this.itemState = 'out'
  }
  @HostListener('mouseenter')
  onMouseEnter() {
    this.itemState = 'hover'
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onCheckBoxChange(event: MatCheckboxChange) {
    let newTask: Task = { ...this.task, completed: event.checked }

    this.store.dispatch(new UpdateTaskAction({ id: newTask.id, changes: newTask }))
  }

  onClick(event: Event) {
    event.stopPropagation()
  }
}
