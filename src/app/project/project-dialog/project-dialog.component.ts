import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Project } from 'src/app/domain/project.model'

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    coverImg: new FormControl('', Validators.required)
  })

  items = []

  title = '新建项目'
  project: Project

  constructor(
    private dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { project: Project }
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

  toSmallSizeUrl(url: string) {
    return url.replace('.jpg', '_tn.jpg')
  }

  toLargeSizeUrl(url: string) {
    return url.replace('_tn', '')
  }

  closeDialog(): void {
    this.dialogRef.close()
  }

  save(event: Event) {
    event.preventDefault()

    if (this.form.valid) {
      let newProject = {
        ...this.project,
        ...this.form.value,
        coverImg: this.toLargeSizeUrl(this.form.value.coverImg)
      }

      if (!this.project) {
        newProject = { ...newProject, members: ['1'] }
      }

      this.dialogRef.close(newProject)
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
