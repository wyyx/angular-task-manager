import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'app-task-header',
	templateUrl: './task-header.component.html',
	styleUrls: [ './task-header.component.scss' ]
})
export class TaskHeaderComponent implements OnInit {
	@Input() listType: string
	@Output() newTask = new EventEmitter<void>()
	@Output() moveAll = new EventEmitter<void>()
	@Output() deleteList = new EventEmitter<void>()
	@Output() modifyListName = new EventEmitter<void>()

	constructor() {}

	ngOnInit() {}

	onNewTaskClick() {
		this.newTask.emit()
	}

	onMoveAllClick() {
		this.moveAll.emit()
	}

	onDeleteListClick() {
		this.deleteList.emit()
	}

	onModifyListName() {
		this.modifyListName.emit()
	}
}
