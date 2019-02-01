import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-modify-task-list-name',
  templateUrl: './modify-task-list-name.component.html',
  styleUrls: ['./modify-task-list-name.component.scss']
})
export class ModifyTaskListNameComponent implements OnInit {
  listName = new FormControl('', Validators.required)

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { name: string },
    private dialog: MatDialogRef<ModifyTaskListNameComponent>
  ) {}

  ngOnInit() {
    this.listName.setValue(this.data.name)
  }

  save() {
    if (this.listName.valid) {
      this.dialog.close(this.listName.value)
    }
  }

  closeDialog() {
    this.dialog.close()
  }
}
