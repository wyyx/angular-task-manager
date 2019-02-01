import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core'
import { ContextMenuComponent } from '../context-menu/context-menu.component'

@Component({
  selector: 'app-context-menu-item',
  templateUrl: './context-menu-item.component.html',
  styleUrls: ['./context-menu-item.component.scss']
})
export class ContextMenuItemComponent implements OnInit {
  @Input() label: string
  @Input() icon: string
  hasChildMenu: boolean = false

  constructor(private menu: ContextMenuComponent, public el: ElementRef) {}

  ngOnInit() {}

  @HostListener('click') onClick() {
    if (this.hasChildMenu) {
      return
    }

    this.menu.closeAllMenu()
  }
}
