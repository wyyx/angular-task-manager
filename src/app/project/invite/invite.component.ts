import { Component, OnInit, Inject, OnDestroy } from '@angular/core'
import { OverlayContainer } from '@angular/cdk/overlay'
import { FormControl } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { UserService } from 'src/app/services/user.service'
import { from, Subject, of } from 'rxjs'
import { mergeMap, takeUntil, switchMap, count } from 'rxjs/operators'
import { User } from 'src/app/domain/user.model'
import { ProjectService } from 'src/app/services/project.service'
import { uniq } from 'lodash'
import { Project } from 'src/app/domain/project.model'

@Component({
	selector: 'app-invite',
	templateUrl: './invite.component.html',
	styleUrls: [ './invite.component.scss' ]
})
export class InviteComponent implements OnInit, OnDestroy {
	membersControl = new FormControl([])
	kill$: Subject<any> = new Subject()

	constructor(
		private dialog: MatDialogRef<InviteComponent>,
		@Inject(MAT_DIALOG_DATA) private data,
		private userService: UserService,
		private projectService: ProjectService
	) {}

	ngOnInit() {}

	ngOnDestroy(): void {
		this.kill$.next()
		this.kill$.complete()
	}

	save() {
		console.log(this.membersControl.value)

		const users: User[] = this.membersControl.value || []
		const project: Project = this.data.project

		from(users)
			.pipe(
				// Update users
				mergeMap((user: User) => this.userService.addProjectRef(user, project)),
				count(),
				switchMap(_ => {
					const members = [ ...project.members ]
					users.forEach(u => members.push(u.id))
					// Update project
					return this.projectService.update({
						id: project.id,
						members: uniq([ ...members ])
					})
				}),
				takeUntil(this.kill$)
			)
			.subscribe()

		this.dialog.close()
	}

	closeDialog() {
		this.dialog.close()
	}
}
