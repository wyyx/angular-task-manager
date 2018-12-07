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

	@HostBinding('@card') cardState = 'out'
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
