import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
	selector: 'app-task-item',
	templateUrl: './task-item.component.html',
	styleUrls: [ './task-item.component.scss' ]
})
export class TaskItemComponent implements OnInit {
	@Input() task
	@Output() editTask = new EventEmitter<void>()

	get avatar() {
		return this.task.owner ? this.task.owner.avatar : 'unassigned'
	}

	constructor() {}

	ngOnInit() {}

	onEditTaskClick() {
		this.editTask.emit()
	}

	onStatusClick(event: MouseEvent) {
		event.stopPropagation()
	}
}
