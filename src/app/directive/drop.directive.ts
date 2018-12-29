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
	@Input() dropTags: string[] = []
	data$: BehaviorSubject<DragData>

	constructor(
		private el: ElementRef,
		private rd: Renderer2,
		private dragDropService: DragDropService
	) {
		this.data$ = dragDropService.getDragData()
	}

	@HostListener('dragenter', [ '$event' ])
	onDragEnter(event: Event) {
		event.preventDefault()
		// event.stopPropagation()

		this.data$
			.subscribe(dragData => {
				// console.log('dragData', dragData)
				if (this.dropTags.indexOf(dragData.tag) > -1) {
					this.rd.addClass(this.el.nativeElement, this.dragEnterClass)

					this.rd.setProperty(this.el.nativeElement, 'dataTransfer.effectAllowed', 'all')
					this.rd.setProperty(this.el.nativeElement, 'dataTransfer.dropEffect', 'move')
				} else {
					this.rd.setProperty(this.el.nativeElement, 'dataTransfer.effectAllowed', 'none')
					this.rd.setProperty(this.el.nativeElement, 'dataTransfer.dropEffect', 'none')
				}
			})
			.unsubscribe()
	}

	@HostListener('dragover', [ '$event' ])
	onDragOver(event: Event) {
		event.preventDefault()
		event.stopPropagation()
	}

	@HostListener('dragleave', [ '$event' ])
	onDragLeave(event: Event) {
		event.preventDefault()
		event.stopPropagation()

		this.rd.removeClass(this.el.nativeElement, this.dragEnterClass)
	}

	@HostListener('drop', [ '$event' ])
	onDrop(event: Event) {
		console.log('drop event fired')

		const subscription = this.data$
			.subscribe(dragData => {
				if (this.dropTags.indexOf(dragData.tag) > -1) {
					this.dropped.emit(dragData)
				}

				this.rd.removeClass(this.el.nativeElement, this.dragEnterClass)
			})
			.unsubscribe()
	}
}
