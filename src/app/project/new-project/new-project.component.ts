import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

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
	constructor(
		private dialogRef: MatDialogRef<NewProjectComponent>,
		@Inject(MAT_DIALOG_DATA) private data: DialogData
	) {
		console.log('data', data)
	}

	ngOnInit() {}

	closeDialog(): void {
		this.dialogRef.close()
	}

	save() {
		this.dialogRef.close('Received message')
	}
}
