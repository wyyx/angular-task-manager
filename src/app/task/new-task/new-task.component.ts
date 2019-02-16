import { Component, OnInit, Inject, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Task } from 'src/app/domain/task.model'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { TaskList } from 'src/app/domain/task-list.model'
import { Store, select } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { getUser } from 'src/app/auth/store/selectors/auth.selectors'
import { tap, takeUntil, take } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { markFormGroupAsTouched } from 'src/app/utils/form.util'

export enum Priorities {
  Emergency = 1,
  Important = 2,
  Normal = 3
}

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit, OnDestroy {
  kill$: Subject<any> = new Subject()

  priorities = [
    {
      label: '紧急',
      value: 1
    },
    {
      label: '重要',
      value: 2
    },
    {
      label: '普通',
      value: 3
    }
  ]

  form: FormGroup
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { list: TaskList; task?: Task; title: string },
    private dialog: MatDialogRef<NewTaskComponent>,
    private store: Store<AppState>
  ) {
    const { task } = this.data

    this.form = this.fb.group({
      desc: [task ? task.desc : '', Validators.required],
      priority: [task ? task.priority : Priorities.Normal, Validators.required],
      dueDate: [task ? task.dueDate : ''],
      reminder: [task ? task.reminder : '']
    })
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  save() {
    let { list, task } = this.data

    markFormGroupAsTouched(this.form)

    if (this.form.valid) {
      this.store
        .pipe(
          select(getUser),
          tap(user =>
            this.dialog.close({
              ...task,
              ...this.form.value,
              taskListId: list.id,
              ownerId: user.id
            } as Task)
          ),
          take(1)
        )
        .subscribe()
    }
  }

  close() {
    this.dialog.close()
  }
}
