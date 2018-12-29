import { Component, OnInit, HostBinding } from '@angular/core'
import { MatDialog } from '@angular/material'
import { InviteComponent } from '../invite/invite.component'
import { EditProjectComponent } from '../edit-project/edit-project.component'
import { NewProjectComponent } from '../new-project/new-project.component'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { slideToRight } from 'src/app/animations/route.anim'
import { listAnim } from 'src/app/animations/list.anim'
import { ProjectService } from 'src/app/services/project.service'
import { Project } from 'src/app/domain/project.model'
import { Router } from '@angular/router'

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: [ './project-list.component.scss' ],
	animations: [ slideToRight, listAnim ]
})
export class ProjectListComponent implements OnInit {
	projects: any[] = []

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
		const dialogRef = this.dialog.open(NewProjectComponent, {
			data: { name: 'xxxxxxxxxxxxxxxxx' }
		})

		dialogRef.afterClosed().subscribe(project => {
			console.log(project)
			if (project) {
				this.projects = [ ...this.projects, project ]
			}
		})
	}

	openInviteDialog() {
		const dialogRef = this.dialog.open(InviteComponent)
	}

	openEditProjectDialog(project) {
		this.dialog.open(EditProjectComponent, {
			data: {
				project: project
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
