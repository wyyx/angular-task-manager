import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
	selector: 'app-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls: [ './edit-project.component.scss' ]
})
export class EditProjectComponent implements OnInit {
	project

	constructor(@Inject(MAT_DIALOG_DATA) private data) {
		this.project = data.project
	}

	ngOnInit() {}
}
