import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { MyCustomMaterialModule } from '../my-custom-material/my-custom-material.module'
import { RouterModule } from '@angular/router'
import { DirectiveModule } from '../directive/directive.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component'
import { AgeInputComponent } from './age-input/age-input.component'

@NgModule({
	imports: [
		CommonModule,
		MyCustomMaterialModule,
		RouterModule,
		DirectiveModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [ ConfirmDialogComponent, AvatarSelectorComponent, AgeInputComponent ],
	exports: [
		CommonModule,
		MyCustomMaterialModule,
		RouterModule,
		DirectiveModule,
		FormsModule,
		ReactiveFormsModule,
		AvatarSelectorComponent,
		AgeInputComponent
	],
	entryComponents: [ ConfirmDialogComponent ]
})
export class SharedModule {}
