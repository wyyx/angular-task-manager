import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormGroup, FormControl, Validators } from '@angular/forms'

export interface DialogData {
	name: string
	isDark: boolean
}

@Component({
	selector: 'app-new-project',
	templateUrl: './new-project.component.html',
	styleUrls: [ './new-project.component.scss' ]
})
export class NewProjectComponent implements OnInit {
	form = new FormGroup({
		name: new FormControl('', Validators.required),
		desc: new FormControl('', Validators.required),
		coverImg: new FormControl('', Validators.required)
	})

	items = []

	constructor(
		private dialogRef: MatDialogRef<NewProjectComponent>,
		@Inject(MAT_DIALOG_DATA) private data: DialogData
	) {
		console.log('data', data)
	}

	ngOnInit() {
		this.getImages()
	}

	closeDialog(): void {
		this.dialogRef.close()
	}

	save(event: Event) {
		event.preventDefault()

		if (this.form.valid) {
			this.dialogRef.close('Received message')
		}
	}

	getImages() {
		for (let index = 0; index < 16; index++) {
			this.items.push(`/assets/img/covers/${index + 1}_tn.jpg`)
		}
	}
}
