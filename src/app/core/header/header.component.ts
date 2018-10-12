import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {
	@Output() toggleSidenav = new EventEmitter<void>()
	@Output() toggleTheme = new EventEmitter<boolean>()

	constructor() {}

	ngOnInit() {}

	onToggleSidenav() {
		this.toggleSidenav.emit()
	}

	onToggleTheme(checked: boolean) {
		this.toggleTheme.emit(checked)
	}
}
