import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Store, select } from '@ngrx/store'
import { Subject } from 'rxjs'
import { map, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators'
import { User } from 'src/app/auth/models/user.model'
import { Project } from 'src/app/domain/project.model'
import { UserService } from 'src/app/services/user.service'
import { Chip } from 'src/app/shared/models/chip.model'
import { AppState } from 'src/app/store'
import { AddOrRemoveMembersAction } from '../store/actions/project.actions'
import { getUser } from 'src/app/auth/store/selectors/auth.selectors'

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit, OnDestroy {
  members = new FormControl([])
  kill$: Subject<any> = new Subject()
  project: Project

  previousMembers: User[]
  currentMembers: User[]

  searchedChips: Chip[] = []

  constructor(
    private dialog: MatDialogRef<InviteComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.project = this.data.project
    this.userService
      .getUsersByProject(this.project)
      .pipe(
        withLatestFrom(this.store.pipe(select(getUser))),
        tap(([users, currentUser]) => {
          this.previousMembers = users

          // Set initial chips
          this.members.setValue(
            // Exclude currentUser
            this.previousMembers
              .filter(u => u.id !== currentUser.id)
              .map(user => ({ label: user.name, value: user }))
          )
        }),
        take(1)
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  save() {
    this.currentMembers = this.members.value.map((chip: Chip) => chip.value)

    console.log('this.previousMembers', this.previousMembers)
    console.log('this.currentMembers', this.currentMembers)

    this.store
      .pipe(
        select(getUser),
        tap(currentUser =>
          this.store.dispatch(
            new AddOrRemoveMembersAction({
              projectId: this.project.id,
              previousMembers: this.previousMembers,
              // Include currentUser
              currentMembers: [...this.currentMembers, currentUser]
            })
          )
        ),
        take(1)
      )
      .subscribe()

    this.dialog.close()
  }

  close() {
    this.dialog.close()
  }

  onFilterChange(filter: string) {
    this.userService
      .searchUsers(filter)
      .pipe(
        tap(v => console.log('[debug]', 'members', v)),
        // Exclude exists members
        map(members => members.filter(m => !this.previousMembers.map(pm => pm.id).includes(m.id))),
        tap(members => (this.searchedChips = members.map(m => ({ label: m.name, value: m })))),
        take(1)
      )
      .subscribe()
  }
}
