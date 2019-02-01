import { Component, OnInit, Input, EventEmitter, HostListener, ElementRef } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  showSubject = new Subject<boolean>()
  showValueChanges: Observable<boolean> = this.showSubject.asObservable()
  show: boolean = false
  _data: any
  x: number = 0
  y: number = 0
  parent: ContextMenuComponent
  children: ContextMenuComponent[] = []

  constructor(public el: ElementRef) {}

  ngOnInit() {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showMenu()
  }

  showMenu() {
    this.show = true
    this.showSubject.next(this.show)
  }

  closeMenu() {
    if (this.children.length > 0) {
      this.children.forEach(child => child.closeMenu())
    }

    this.show = false
    this.showSubject.next(this.show)
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
