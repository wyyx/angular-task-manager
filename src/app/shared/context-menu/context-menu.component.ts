import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  show: boolean = false
  _data: any = {}
  x: number = 0
  y: number = 0
  parent: ContextMenuComponent
  children: ContextMenuComponent[] = []
  clientRect: {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
  } = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 }

  @ViewChild('menuContainer') menuContainer: ElementRef

  @HostListener('mouseenter') onMouseEnter() {
    this.showMenu()
  }

  constructor(public el: ElementRef) {}

  ngOnInit() {}

  ngDoCheck(): void {
    // this.setRect()
  }

  setRect() {
    if (this.menuContainer) {
      this.root.clientRect.top = this.root.y
      this.root.clientRect.left = this.root.x
      this.root.clientRect.right = this.menuContainer.nativeElement.getBoundingClientRect().right
      this.root.clientRect.bottom = this.menuContainer.nativeElement.getBoundingClientRect().bottom
      this.root.clientRect.width = this.root.clientRect.right - this.root.clientRect.left
      this.root.clientRect.height = this.root.clientRect.bottom - this.root.clientRect.top

      console.log(this.root.clientRect)

      const { top, bottom, left, right, width, height } = this.root.clientRect

      if (window) {
        if (top + height > window.innerHeight) {
          this.root.y = this.root.y - (top + height - window.innerHeight)
        }

        if (left + width > window.innerWidth) {
          this.root.x = this.root.x - (left + width - window.innerWidth)
        }
      }
    }
  }

  showMenu() {
    this.show = true
  }

  closeMenu() {
    if (this.children.length > 0) {
      this.children.forEach(child => child.closeMenu())
    }

    this.show = false
  }

  closeAllMenu() {
    let root: ContextMenuComponent = this
    while (root.parent) {
      root = root.parent
    }

    root.closeMenu()
  }

  setPosition(x: number, y: number) {
    this.x = x
    this.y = y
  }

  get root() {
    let root: ContextMenuComponent = this
    while (root.parent) {
      root = root.parent
    }

    return root
  }

  get isRoot() {
    return this === this.root
  }

  set data(value) {
    this.root._data = value
  }

  get data() {
    return this.root._data
  }

  onBackdropClick() {
    this.closeAllMenu()
  }
}
