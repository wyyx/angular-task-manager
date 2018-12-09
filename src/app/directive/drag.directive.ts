import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core'
import { DragData, DragDropService } from './drag-drop.service'

@Directive({
	selector: '[appDraggable]'
})
export class DragDirective {
	constructor(
		private el: ElementRef,
		private rd: Renderer2,
		private dragDropService: DragDropService
	) {}

	private _isDraggable = false
	@Input() dragClass
	@Input() dragTag: string
	@Input() dragData: any

	@Input('appDraggable')
	set isDraggable(val) {
		this._isDraggable = val
		this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`)
	}

	get isDraggable() {
		return this._isDraggable
	}

	@HostListener('dragstart', [ '$event' ])
	onDragStart(event: Event) {
		this.rd.addClass(this.el.nativeElement, this.dragClass)
		console.log({ tag: this.dragTag, data: this.dragData })

		this.dragDropService.setDragData({ tag: this.dragTag, data: this.dragData })

		this.rd.setProperty(this.el.nativeElement, 'dataTransfer.effectAllowed', 'all')
		this.rd.setProperty(this.el.nativeElement, 'dataTransfer.dropEffect', 'move')
	}

	@HostListener('dragend', [ '$event' ])
	onDragEnd(event: Event) {
		this.rd.removeClass(this.el.nativeElement, this.dragClass)
	}
}
