import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Store } from '@ngrx/store'
import { uniq } from 'lodash'
import { Subject } from 'rxjs'
import { map, takeUntil, tap, take } from 'rxjs/operators'
import { User } from 'src/app/auth/models/user.model'
import { Project } from 'src/app/domain/project.model'
import { ProjectService } from 'src/app/services/project.service'
import { UserService } from 'src/app/services/user.service'
import { Chip } from 'src/app/shared/models/chip.model'
import { AppState } from 'src/app/store'
import { UpdateProjectAction } from '../store/actions/project.actions'
import { UpdateUserAction } from 'src/app/auth/store/actions/user.actions'

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit, OnDestroy {
  members = new FormControl([])
  kill$: Subject<any> = new Subject()
  project: Project
  searchedMemberChips: Chip[] = []
  existChips: Chip[] = []

  constructor(
    private dialog: MatDialogRef<InviteComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private userService: UserService,
    private projectService: ProjectService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.project = this.data.project
    this.userService
      .getUsersByProject(this.project)
      .pipe(
        tap(users => (this.existChips = users.map(user => ({ label: user.name, value: user })))),
        take(1)
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  save() {
    const members: User[] = this.members.value.map((chip: Chip) => chip.value)
    const addedMembers: User[] = members.filter(
      m => !this.existChips.map(c => c.value.id).includes(m.id)
    )
    const deletedMembers: User[] = this.existChips
      .filter(c => !members.map(m => m.id).includes(c.value.id))
      .map(c => c.value)

    // Update addedMembers, add projectRef
    addedMembers.forEach(member =>
      this.store.dispatch(
        new UpdateUserAction({
          id: member.id,
          changes: { projectIds: uniq([...member.projectIds, this.project.id]) }
        })
      )
    )

    // Update deletedMembers, remove projectRef
    deletedMembers.forEach(member =>
      this.store.dispatch(
        new UpdateUserAction({
          id: member.id,
          changes: {
            projectIds: uniq([
              ...member.projectIds.filter(projectId => projectId !== this.project.id)
            ])
          }
        })
      )
    )

    // Update project
    this.store.dispatch(
      new UpdateProjectAction({
        id: this.project.id,
        changes: { members: uniq([...members.map(m => m.id)]) }
      })
    )

    this.dialog.close()
  }

  close() {
    this.dialog.close()
  }

  onFilterChange(filter: string) {
    this.userService
      .searchUsers(filter)
      .pipe(
        // Exclude exists members
        map(members => members.filter(m => !this.project.members.includes(m.id))),
        tap(
          members => (this.searchedMemberChips = members.map(m => ({ label: m.name, value: m })))
        ),
        takeUntil(this.kill$)
      )
      .subscribe()
  }
}
