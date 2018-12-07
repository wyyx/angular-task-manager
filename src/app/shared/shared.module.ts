import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { MyCustomMaterialModule } from '../my-custom-material/my-custom-material.module'
import { RouterModule } from '@angular/router'

@NgModule({
	imports: [ CommonModule, MyCustomMaterialModule, RouterModule ],
	declarations: [ ConfirmDialogComponent ],
	exports: [ CommonModule, MyCustomMaterialModule, RouterModule ],
	entryComponents: [ ConfirmDialogComponent ]
})
export class SharedModule {}
