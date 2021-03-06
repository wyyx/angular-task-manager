import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import { filter, takeUntil, tap } from 'rxjs/operators'
import { listAnim } from 'src/app/animations/list.anim'
import { slideToRightAnim } from 'src/app/animations/route.anim'
import { User } from 'src/app/auth/models/user.model'
import { Project } from 'src/app/domain/project.model'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { AppState } from 'src/app/store'
import { InviteComponent } from '../invite/invite.component'
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component'
import {
  AddProjectAction,
  DeleteProjectAction,
  NeedAllProjectsAction,
  UpdateProjectAction
} from '../store/actions/project.actions'
import { getProjects, getAllProjectsIsLoading } from '../store/selectors/projects.selectors'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRightAnim, listAnim]
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects$: Observable<Project[]>
  isLoading$: Observable<boolean>
  kill$: Subject<any> = new Subject()

  @HostBinding('@slideToRightAnim') state

  constructor(private dialog: MatDialog, private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new NeedAllProjectsAction())
    this.projects$ = this.store.pipe(select(getProjects))
    this.isLoading$ = this.store.pipe(select(getAllProjectsIsLoading))
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  onProjectClick(project: Project) {
    this.router.navigate(['/projects', project.id])
  }

  openInviteDialog(project: Project) {
    const dialogRef = this.dialog.open(InviteComponent, {
      data: {
        project
      }
    })

    dialogRef
      .afterClosed()
      .pipe(
        filter(members => members),
        tap((members: User[]) =>
          this.store.dispatch(
            new UpdateProjectAction({
              id: project.id,
              changes: { ...project, members: members.map(m => m.id) }
            })
          )
        ),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  openNewProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent)

    dialogRef
      .afterClosed()
      .pipe(
        filter(project => !!project),
        tap((project: Project) => this.store.dispatch(new AddProjectAction({ project }))),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  openEditProjectDialog(project: Project) {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      data: {
        project
      }
    })

    dialogRef
      .afterClosed()
      .pipe(
        filter(project => !!project),
        tap((project: Project) =>
          this.store.dispatch(new UpdateProjectAction({ id: project.id, changes: project }))
        ),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  openDeleteProjectDialog(project: Project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除项目'
      }
    })

    dialogRef
      .afterClosed()
      .pipe(
        filter(ok => ok),
        tap(() => this.store.dispatch(new DeleteProjectAction({ project }))),
        takeUntil(this.kill$)
      )
      .subscribe()
  }
}
