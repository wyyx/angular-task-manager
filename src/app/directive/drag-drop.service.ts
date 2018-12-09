import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

export interface DragData {
	tag: string
	data: any
}

@Injectable({
	providedIn: 'root'
})
export class DragDropService {
	private _dragData = new BehaviorSubject<DragData>(null)
	myData = 'houdini'
	constructor() {}

	setDragData(dragData: DragData) {
		this._dragData.next(dragData)
	}

	getDragData(): BehaviorSubject<DragData> {
		return this._dragData
	}

	clearDragData() {
		this._dragData.next(null)
	}
}
