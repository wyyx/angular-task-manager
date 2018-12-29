import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core'
import { itemAnim } from 'src/app/animations/item.anim'

@Component({
	selector: 'app-task-item',
	templateUrl: './task-item.component.html',
	styleUrls: [ './task-item.component.scss' ],
	animations: [ itemAnim ]
})
export class TaskItemComponent implements OnInit {
	@Input() task
	@Output() editTask = new EventEmitter<void>()

	itemState = 'out'
	@HostListener('mouseleave')
	onMouseLeave() {
		this.itemState = 'out'
	}
	@HostListener('mouseenter')
	onMouseEnter() {
		this.itemState = 'hover'
	}

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
