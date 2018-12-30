import { Component, OnInit } from '@angular/core'
import { OverlayContainer } from '@angular/cdk/overlay'
import { FormControl } from '@angular/forms'

@Component({
	selector: 'app-invite',
	templateUrl: './invite.component.html',
	styleUrls: [ './invite.component.scss' ]
})
export class InviteComponent implements OnInit {
	membersControl = new FormControl([])

	constructor() {}

	ngOnInit() {}

	getUserName(user: { id: string; name: string }) {
		return user.name
	}
}
