import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	HostBinding,
	HostListener
} from '@angular/core'
import { cardAnim } from 'src/app/animations/card.anim'

@Component({
	selector: 'app-project-item',
	templateUrl: './project-item.component.html',
	styleUrls: [ './project-item.component.scss' ],
	animations: [ cardAnim ]
})
export class ProjectItemComponent implements OnInit {
	@Input() item
	@Output() invite = new EventEmitter<void>()
	@Output() editProject = new EventEmitter<void>()
	@Output() deleteProject = new EventEmitter<void>()

	cardState = 'out'
	@HostListener('mouseleave')
	onMouseLeave() {
		this.cardState = 'out'
	}
	@HostListener('mouseenter')
	onMouseEnter() {
		this.cardState = 'hover'
	}

	constructor() {}

	ngOnInit() {}

	onInviteClick(event: Event) {
		event.stopPropagation()
		this.invite.emit()
	}

	onEditProjectClick(event: Event) {
		event.stopPropagation()
		this.editProject.emit()
	}

	onDeleteProjectClick(event: Event) {
		event.stopPropagation()
		this.deleteProject.emit()
	}
}
