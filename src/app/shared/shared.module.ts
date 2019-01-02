import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { MyCustomMaterialModule } from '../my-custom-material/my-custom-material.module'
import { RouterModule } from '@angular/router'
import { DirectiveModule } from '../directive/directive.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AgeInputComponent } from './age-input/age-input.component'
import { ImageSelectorComponent } from './image-selector/image-selector.component'
import { ChipSelectorComponent } from './chip-selector/chip-selector.component'
import { CertificateSelectorComponent } from './certificate-selector/certificate-selector.component'
import { AddressSelectorComponent } from './address-selector/address-selector.component'

@NgModule({
	imports: [
		CommonModule,
		MyCustomMaterialModule,
		RouterModule,
		DirectiveModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		ConfirmDialogComponent,
		ImageSelectorComponent,
		AgeInputComponent,
		ChipSelectorComponent,
		CertificateSelectorComponent,
		AddressSelectorComponent
	],
	exports: [
		CommonModule,
		MyCustomMaterialModule,
		RouterModule,
		DirectiveModule,
		FormsModule,
		ReactiveFormsModule,
		ImageSelectorComponent,
		AgeInputComponent,
		ChipSelectorComponent,
		CertificateSelectorComponent,
		AddressSelectorComponent
	],
	entryComponents: [ ConfirmDialogComponent ]
})
export class SharedModule {}
