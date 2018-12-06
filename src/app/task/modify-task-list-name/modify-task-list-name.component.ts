import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
	selector: 'app-modify-task-list-name',
	templateUrl: './modify-task-list-name.component.html',
	styleUrls: [ './modify-task-list-name.component.scss' ]
})
export class ModifyTaskListNameComponent implements OnInit {
	name: string

	constructor(@Inject(MAT_DIALOG_DATA) private data) {}

	ngOnInit() {
		this.name = this.data.name
	}
}
