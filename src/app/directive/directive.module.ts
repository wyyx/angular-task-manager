import { NgModule } from '@angular/core'
import { DropDirective } from './drop.directive'
import { DragDirective } from './drag.directive'
import { DragDropService } from './drag-drop.service'

@NgModule({
	imports: [],
	declarations: [ DragDirective, DropDirective ],
	exports: [ DragDirective, DropDirective ]
})
export class DirectiveModule {}