import { NgModule } from '@angular/core'
import { DropDirective } from './drop.directive'
import { DragDirective } from './drag.directive'
import { MediaClassDirective } from './media-class.directive'

@NgModule({
  imports: [],
  declarations: [DragDirective, DropDirective, MediaClassDirective],
  exports: [DragDirective, DropDirective, MediaClassDirective]
})
export class DirectiveModule {}
