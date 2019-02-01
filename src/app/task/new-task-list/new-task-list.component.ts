import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material'
import { TaskList } from 'src/app/domain/task-list.model'

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss']
})
export class NewTaskListComponent implements OnInit {
  constructor(private dialog: MatDialogRef<NewTaskListComponent>) {}
  taskListName = new FormControl('', Validators.required)

  ngOnInit() {}

  save() {
    if (this.taskListName.valid) {
      this.dialog.close({ name: this.taskListName.value } as TaskList)
    }
  }

  closeDialog() {
    this.dialog.close()
  }
}
