import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ProjectDialogData } from '../project-list/project-list.component'
import { Project } from 'src/app/domain/project.model'

export interface DialogData {
	name: string
	isDark: boolean
}

@Component({
	selector: 'app-project-dialog',
	templateUrl: './project-dialog.component.html',
	styleUrls: [ './project-dialog.component.scss' ]
})
export class ProjectDialogComponent implements OnInit {
	form = new FormGroup({
		name: new FormControl('', Validators.required),
		desc: new FormControl('', Validators.required),
		coverImg: new FormControl('', Validators.required)
	})

	items = []

	title
	project: Project

	constructor(
		private dialogRef: MatDialogRef<ProjectDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data: ProjectDialogData
	) {
		console.log('data', data)
	}

	ngOnInit() {
		this.getImages()
		this.title = this.data.title
		if (this.data.project) {
			this.project = this.data.project
			this.form.get('name').setValue(this.project.name)
			this.form.get('desc').setValue(this.project.desc)
			this.form.get('coverImg').setValue(this.toSmallSizeUrl(this.project.coverImg))
		}
	}

	toSmallSizeUrl(url: string) {
		return url.replace('.jpg', '_tn.jpg')
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
				coverImg: this.form.value.coverImg.replace('_tn', '')
			}

			if (!this.project.id) {
				newProject = { ...newProject, members: [ '1' ] }
			}

			this.dialogRef.close(newProject)
		}
	}

	getImages() {
		for (let index = 0; index < 20; index++) {
			this.items.push(`/assets/img/covers/${index}_tn.jpg`)
		}
	}
}
