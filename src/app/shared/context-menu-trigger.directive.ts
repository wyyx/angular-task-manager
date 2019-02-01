import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  Renderer2
} from '@angular/core'
import { ContextMenuItemComponent } from './context-menu-item/context-menu-item.component'
import { ContextMenuComponent } from './context-menu/context-menu.component'

@Directive({
  selector: '[appContextMenuTriggerFor]'
})
export class ContextMenuTriggerDirective implements OnInit {
  @Input('appContextMenuTriggerFor')
  childMenu: ContextMenuComponent

  constructor(private item: ContextMenuItemComponent, private parentMenu: ContextMenuComponent) {}

  ngOnInit(): void {
    this.item.hasChildMenu = true
    this.parentMenu.children.push(this.childMenu)
    this.childMenu.parent = this.parentMenu
  }

  @HostListener('mouseenter') onMouseEnter() {
    let itemRect: DOMRect = this.item.el.nativeElement.getBoundingClientRect()

    this.childMenu.x = itemRect.left + itemRect.width
    this.childMenu.y = itemRect.top
    this.childMenu.showMenu()
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.childMenu.closeMenu()
  }
}
