import { Component, OnInit, Inject, EventEmitter } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'
import { FormControl } from '@angular/forms'

@Component({
	selector: 'app-move-task',
	templateUrl: './move-task.component.html',
	styleUrls: [ './move-task.component.scss' ]
})
export class MoveTaskComponent implements OnInit {
	targetList = new FormControl('')
	lists = []

	constructor(
		@Inject(MAT_DIALOG_DATA) private data,
		private dialog: MatDialogRef<MoveTaskComponent>
	) {}

	ngOnInit() {
		this.lists = this.data.lists
	}

	confirm() {
		this.dialog.close(this.targetList.value)
	}

	closeDialog() {
		this.dialog.close()
	}
}
