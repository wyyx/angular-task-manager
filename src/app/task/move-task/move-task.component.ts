import { Component, OnInit, Inject, EventEmitter } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { TaskListView } from 'src/app/domain/task-list-view.model'

@Component({
  selector: 'app-move-task',
  templateUrl: './move-task.component.html',
  styleUrls: ['./move-task.component.scss']
})
export class MoveTaskComponent implements OnInit {
  targetList = new FormControl('')
  lists$: Observable<TaskListView[]>

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { lists: Observable<TaskListView[]> },
    private dialog: MatDialogRef<MoveTaskComponent>
  ) {}

  ngOnInit() {
    this.lists$ = this.data.lists
  }

  confirm() {
    console.log(this.targetList.value)
    this.dialog.close(this.targetList.value)
  }

  closeDialog() {
    this.dialog.close()
  }
}
