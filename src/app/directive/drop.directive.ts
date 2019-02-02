import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  Input,
  Output,
  EventEmitter
} from '@angular/core'
import { DragDropService, DragData } from './drag-drop.service'
import { Observable, BehaviorSubject } from 'rxjs'

@Directive({
  selector: '[appDroppable]'
})
export class DropDirective {
  @Output() dropped = new EventEmitter<DragData>()
  @Input() dragEnterClass
  @Input() acceptedTags: string[] = []
  data$: Observable<DragData>

  constructor(
    private el: ElementRef,
    private r2: Renderer2,
    private dragDropService: DragDropService
  ) {
    this.data$ = dragDropService.getDragData()
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: Event) {
    event.preventDefault()
    // event.stopPropagation()

    this.data$
      .subscribe(dragData => {
        if (this.acceptedTags.includes(dragData.tag)) {
          this.r2.addClass(this.el.nativeElement, this.dragEnterClass)

          this.r2.setProperty(this.el.nativeElement, 'dataTransfer.effectAllowed', 'all')
          this.r2.setProperty(this.el.nativeElement, 'dataTransfer.dropEffect', 'move')
        } else {
          this.r2.setProperty(this.el.nativeElement, 'dataTransfer.effectAllowed', 'none')
          this.r2.setProperty(this.el.nativeElement, 'dataTransfer.dropEffect', 'none')
        }
      })
      .unsubscribe()
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: Event) {
    event.preventDefault()
    event.stopPropagation()
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: Event) {
    event.preventDefault()
    event.stopPropagation()

    this.r2.removeClass(this.el.nativeElement, this.dragEnterClass)
  }

  @HostListener('drop', ['$event'])
  onDrop(event: Event) {
    console.log('drop event fired')

    this.data$
      .subscribe(dragData => {
        if (this.acceptedTags.includes(dragData.tag)) {
          this.dropped.emit(dragData)
        }

        this.r2.removeClass(this.el.nativeElement, this.dragEnterClass)
      })
      .unsubscribe()
  }
}
