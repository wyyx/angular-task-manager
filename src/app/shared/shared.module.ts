import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { MyCustomMaterialModule } from '../my-custom-material/my-custom-material.module'

@NgModule({
	imports: [ CommonModule, MyCustomMaterialModule ],
	declarations: [ ConfirmDialogComponent ],
	exports: [ CommonModule, MyCustomMaterialModule ],
	entryComponents: [ ConfirmDialogComponent ]
})
export class SharedModule {}
