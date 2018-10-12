import { NgModule, SkipSelf, Optional } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { MyCustomMaterialModule } from '../my-custom-material/my-custom-material.module'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { loadSvgResources } from '../utils/svg.util'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
	imports: [ CommonModule, MyCustomMaterialModule, HttpClientModule ],
	declarations: [ HeaderComponent, FooterComponent, SidebarComponent ],
	exports: [ HeaderComponent, FooterComponent, SidebarComponent ]
})
export class CoreModule {
	constructor(
		@SkipSelf()
		@Optional()
		parent: CoreModule,
		ir: MatIconRegistry,
		ds: DomSanitizer
	) {
		if (parent) {
			throw new Error('CoreModule is already loaded. Import it in the AppModule only')
		}

		loadSvgResources(ir, ds)
	}
}
