import { Component, OnInit, HostBinding } from '@angular/core'
import { MatDialog } from '@angular/material'
import { InviteComponent } from '../invite/invite.component'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { slideToRight } from 'src/app/animations/route.anim'
import { listAnim } from 'src/app/animations/list.anim'
import { ProjectService } from 'src/app/services/project.service'
import { Project } from 'src/app/domain/project.model'
import { Router } from '@angular/router'
import { take } from 'rxjs/operators'
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component'

export interface ProjectDialogData {
	title: string
	project?: Project
}

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: [ './project-list.component.scss' ],
	animations: [ slideToRight, listAnim ]
})
export class ProjectListComponent implements OnInit {
	projects: Project[] = []

	@HostBinding('@routeAnim') state

	constructor(
		private dialog: MatDialog,
		private projectService: ProjectService,
		private router: Router
	) {}

	ngOnInit() {
		this.projectService.get('1').subscribe(projectList => {
			this.projects = projectList
		})
	}

	onProjectClick(project: Project) {
		this.router.navigate([ '/tasks', { projectId: project.id } ])
	}

	openNewProjectDialog(): void {
		const dialogRef = this.dialog.open(ProjectDialogComponent, {
			data: {
				title: '新建项目'
			}
		})

		dialogRef.afterClosed().subscribe(project => {
			console.log(project)
			if (project) {
				this.projects = [ ...this.projects, project ]

				this.projectService.add(project).pipe(take(1)).subscribe()
			}
		})
	}

	openInviteDialog() {
		const dialogRef = this.dialog.open(InviteComponent)
	}

	openEditProjectDialog(project) {
		const dialogRef = this.dialog.open(ProjectDialogComponent, {
			data: {
				title: '编辑项目',
				project: project
			}
		})

		dialogRef.afterClosed().subscribe(project => {
			if (project) {
				const index = this.projects.findIndex(p => p.id == project.id)
				this.projects.splice(index, 1, project)

				this.projectService.update(project).pipe(take(1)).subscribe()
			}
		})
	}

	openDeleteProjectDialog(project) {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			data: {
				title: '删除项目'
			}
		})
		dialogRef.afterClosed().subscribe(result => {
			console.log('detele project:', result)
			if (result) {
				this.projects = this.projects.filter(p => p.id != project.id)
			}
		})
	}
}
