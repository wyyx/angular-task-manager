import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
	selector: 'app-edit-task',
	templateUrl: './edit-task.component.html',
	styleUrls: [ './edit-task.component.scss' ]
})
export class EditTaskComponent implements OnInit {
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

	task

	constructor(@Inject(MAT_DIALOG_DATA) data) {
		this.task = data.task
	}

	ngOnInit() {}
}
