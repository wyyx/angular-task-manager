import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { MyCustomMaterialModule } from './my-custom-material/my-custom-material.module'

@NgModule({
	declarations: [ AppComponent ],
	imports: [ BrowserModule, CoreModule, MyCustomMaterialModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
