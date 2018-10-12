import { Component } from '@angular/core'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	isDarkTheme = false

	onToggleTheme(checked: boolean) {
		this.isDarkTheme = checked
	}
}
