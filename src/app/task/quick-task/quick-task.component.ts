import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core'

@Component({
	selector: 'app-quick-task',
	templateUrl: './quick-task.component.html',
	styleUrls: [ './quick-task.component.scss' ]
})
export class QuickTaskComponent implements OnInit {
	desc: string
	@Output() quickTask = new EventEmitter<string>()

	constructor() {}

	ngOnInit() {}

	@HostListener('keyup.enter')
	onCreateQuickTaskClick() {
		if (!this.desc || !this.desc.trim()) {
			return
		}

		this.quickTask.emit(this.desc)
		this.desc = ''
	}
}
