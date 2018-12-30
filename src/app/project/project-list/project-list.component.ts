import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core'
import { MatDialog } from '@angular/material'
import { InviteComponent } from '../invite/invite.component'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { slideToRight } from 'src/app/animations/route.anim'
import { listAnim } from 'src/app/animations/list.anim'
import { ProjectService } from 'src/app/services/project.service'
import { Project } from 'src/app/domain/project.model'
import { Router } from '@angular/router'
import { take, mergeMap, takeUntil } from 'rxjs/operators'
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component'
import { of, Subject } from 'rxjs'

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: [ './project-list.component.scss' ],
	animations: [ slideToRight, listAnim ]
})
export class ProjectListComponent implements OnInit, OnDestroy {
	projects: Project[] = []
	subManager$ = new Subject<any>()

	@HostBinding('@routeAnim') state

	constructor(
		private dialog: MatDialog,
		private projectService: ProjectService,
		private router: Router
	) {}

	ngOnInit() {
		this.projectService.get('1').pipe(takeUntil(this.subManager$)).subscribe(projectList => {
			this.projects = projectList
		})
	}

	ngOnDestroy(): void {
		this.subManager$.next()
		this.subManager$.complete()
	}

	onProjectClick(project: Project) {
		this.router.navigate([ '/tasks', { projectId: project.id } ])
	}

	openNewProjectDialog(): void {
		const dialogRef = this.dialog.open(ProjectDialogComponent)

		dialogRef.afterClosed().subscribe(project => {
			if (project) {
				const projects = this.projects ? this.projects : []
				this.projects = [ ...projects, project ]

				this.projectService.add(project).pipe(takeUntil(this.subManager$)).subscribe()
			}
		})
	}

	openInviteDialog() {
		const dialogRef = this.dialog.open(InviteComponent)
	}

	openEditProjectDialog(project) {
		const dialogRef = this.dialog.open(ProjectDialogComponent, {
			data: {
				project
			}
		})

		dialogRef.afterClosed().subscribe(project => {
			if (project) {
				const index = this.projects.findIndex(p => p.id == project.id)
				this.projects.splice(index, 1, project)

				this.projectService.update(project).pipe(takeUntil(this.subManager$)).subscribe()
			}
		})
	}

	openDeleteProjectDialog(project) {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			data: {
				title: '删除项目'
			}
		})

		dialogRef
			.afterClosed()
			.pipe(
				mergeMap(res => {
					if (res) {
						this.projects = this.projects.filter(p => p.id != project.id)
						return this.projectService.delete(project).pipe(take(1))
					} else {
						return of(null)
					}
				}),
				takeUntil(this.subManager$)
			)
			.subscribe()
	}
}
