import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { AppRoutingModule } from './app-routing.module'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { LoginModule } from './login/login.module'
import { Router } from '@angular/router'
import { ProjectModule } from './project/project.module'
import { TaskModule } from './task/task.module'
import { SharedModule } from './shared/shared.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
	declarations: [ AppComponent, PageNotFoundComponent ],
	imports: [
		BrowserModule,
		CoreModule,
		SharedModule,
		LoginModule,
		AppRoutingModule,
		ProjectModule,
		TaskModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {
	// Diagnostic only: inspect router configuration
	constructor(router: Router) {
		// Use a custom replacer to display function names in the route configs
		const replacer = (key, value) => (typeof value === 'function' ? value.name : value)
		console.log('Routes: ', JSON.stringify(router.config, replacer, 2))
	}
}
