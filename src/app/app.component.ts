import { Component } from '@angular/core'
import { OverlayContainer } from '@angular/cdk/overlay'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	isDarkTheme = false
	squareState = 'red'

	constructor(private oc: OverlayContainer) {}

	onToggleTheme(checked: boolean) {
		this.isDarkTheme = checked

		let theme = 'my-dark-theme'
		if (this.isDarkTheme) {
			this.oc.getContainerElement().classList.add(theme)
		} else {
			this.oc.getContainerElement().classList.remove(theme)
		}
	}
}
