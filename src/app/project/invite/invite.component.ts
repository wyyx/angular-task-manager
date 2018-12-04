import { Component, OnInit } from '@angular/core'
import { OverlayContainer } from '@angular/cdk/overlay'

@Component({
	selector: 'app-invite',
	templateUrl: './invite.component.html',
	styleUrls: [ './invite.component.scss' ]
})
export class InviteComponent implements OnInit {
	users = [
		{ id: '001', name: 'Tom' },
		{ id: '002', name: 'Rick' },
		{ id: '003', name: 'Micheal' },
		{ id: '004', name: 'Michell' }
	]
	constructor() {}

	ngOnInit() {}

	getUserName(user: { id: string; name: string }) {
		return user.name
	}
}
