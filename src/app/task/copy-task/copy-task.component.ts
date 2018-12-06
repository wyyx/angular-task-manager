import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material'

@Component({
	selector: 'app-copy-task',
	templateUrl: './copy-task.component.html',
	styleUrls: [ './copy-task.component.scss' ]
})
export class CopyTaskComponent implements OnInit {
	lists = []
	constructor(@Inject(MAT_DIALOG_DATA) private data, private dialog: MatDialog) {}

	ngOnInit() {
		this.lists = this.data.lists
	}
}
