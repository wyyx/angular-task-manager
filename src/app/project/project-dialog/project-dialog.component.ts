import { Component, OnInit, Inject, OnDestroy } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Project } from 'src/app/domain/project.model'
import { Store, select } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { getUser } from 'src/app/auth/store/selectors/auth.selectors'
import { tap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit, OnDestroy {
  kill$: Subject<any> = new Subject()

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    desc: new FormControl(''),
    coverImg: new FormControl('', Validators.required)
  })

  items = []

  title = '新建项目'
  project: Project

  constructor(
    private dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { project: Project },
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.getThumbnails()
    this.form.get('coverImg').setValue(this.getRandomImg())
    this.project = this.data && this.data.project

    // Edit project
    if (this.project) {
      this.title = '编辑项目'
      this.form.get('name').setValue(this.project.name)
      this.form.get('desc').setValue(this.project.desc)
      this.form.get('coverImg').setValue(this.toSmallSizeUrl(this.project.coverImg))
    }
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  toSmallSizeUrl(url: string) {
    return url.replace('.jpg', '_tn.jpg')
  }

  toLargeSizeUrl(url: string) {
    return url.replace('_tn', '')
  }

  closeDialog(): void {
    this.dialogRef.close()
  }

  save() {
    if (this.form.valid) {
      let newProject = {
        ...this.project,
        ...this.form.value,
        coverImg: this.toLargeSizeUrl(this.form.value.coverImg)
      }

      this.store
        .pipe(
          select(getUser),
          tap(user => {
            // Add new project
            if (!this.project) {
              newProject = { ...newProject, members: [user.id] }
            }

            this.dialogRef.close(newProject)
          }),
          takeUntil(this.kill$)
        )
        .subscribe()
    }
  }

  getRandomImg() {
    const index = Math.floor(Math.random() * 40)
    return `/assets/img/covers/${index}_tn.jpg`
  }

  getThumbnails() {
    for (let index = 0; index < 40; index++) {
      this.items.push(`/assets/img/covers/${index}_tn.jpg`)
    }
  }
}
