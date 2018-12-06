import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'app-project-item',
	templateUrl: './project-item.component.html',
	styleUrls: [ './project-item.component.scss' ]
})
export class ProjectItemComponent implements OnInit {
	@Input() item
	@Output() invite = new EventEmitter<void>()
	@Output() editProject = new EventEmitter<void>()
	@Output() deleteProject = new EventEmitter<void>()

	constructor() {}

	ngOnInit() {}

	onInviteClick() {
		this.invite.emit()
	}

	onEditProjectClick() {
		this.editProject.emit()
	}

	onDeleteProjectClick() {
		this.deleteProject.emit()
	}
}
