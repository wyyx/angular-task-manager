import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { MyCustomMaterialModule } from './my-custom-material/my-custom-material.module'
import { AppRoutingModule } from './app-routing.module'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { LoginModule } from './login/login.module'
import { Router } from '@angular/router'

@NgModule({
	declarations: [ AppComponent, PageNotFoundComponent ],
	imports: [ BrowserModule, CoreModule, MyCustomMaterialModule, LoginModule, AppRoutingModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {
	// // Diagnostic only: inspect router configuration
	// constructor(router: Router) {
	// 	// Use a custom replacer to display function names in the route configs
	// 	const replacer = (key, value) => (typeof value === 'function' ? value.name : value)
	// 	console.log('Routes: ', JSON.stringify(router.config, replacer, 2))
	// }
}
