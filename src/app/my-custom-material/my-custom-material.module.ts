import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatListModule, MatList } from '@angular/material/list'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatDialogModule } from '@angular/material/dialog'
import {
	MatAutocompleteModule,
	MatMenuModule,
	MatCheckboxModule,
	MatTooltipModule,
	MatDatepickerModule,
	MatRadioModule,
	MatNativeDateModule,
	MatSelectModule,
	MatButtonToggleModule
} from '@angular/material'

@NgModule({
	exports: [
		BrowserAnimationsModule,
		MatSidenavModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatInputModule,
		MatListModule,
		MatSlideToggleModule,
		MatGridListModule,
		MatDialogModule,
		MatAutocompleteModule,
		MatMenuModule,
		MatListModule,
		MatListModule,
		MatCheckboxModule,
		MatTooltipModule,
		MatDatepickerModule,
		MatRadioModule,
		MatNativeDateModule,
		MatSelectModule,
		MatDatepickerModule,
		MatButtonToggleModule
	]
})
export class MyCustomMaterialModule {}
