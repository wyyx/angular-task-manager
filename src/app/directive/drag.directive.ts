import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core'
import { DragData, DragDropService } from './drag-drop.service'

@Directive({
  selector: '[appDraggable]'
})
export class DragDirective {
  constructor(
    private el: ElementRef,
    private r2: Renderer2,
    private dragDropService: DragDropService
  ) {}

  private _isDraggable = false
  @Input() dragClass
  @Input() dragTag: string
  @Input() dragData: any

  @Input('appDraggable')
  set isDraggable(val) {
    this._isDraggable = val
    this.r2.setAttribute(this.el.nativeElement, 'draggable', `${val}`)
  }

  get isDraggable() {
    return this._isDraggable
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: Event) {
    event.stopPropagation()

    this.r2.addClass(this.el.nativeElement, this.dragClass)
    console.log('onDragStart', { tag: this.dragTag, data: this.dragData })

    this.dragDropService.setDragData({
      tag: this.dragTag,
      data: this.dragData
    })

    this.r2.setProperty(this.el.nativeElement, 'dataTransfer.effectAllowed', 'all')
    this.r2.setProperty(this.el.nativeElement, 'dataTransfer.dropEffect', 'move')
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: Event) {
    event.stopPropagation()

    this.r2.removeClass(this.el.nativeElement, this.dragClass)
  }
}
