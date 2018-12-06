import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { InviteComponent } from '../invite/invite.component'
import { EditProjectComponent } from '../edit-project/edit-project.component'
import { NewProjectComponent } from '../new-project/new-project.component'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: [ './project-list.component.scss' ]
})
export class ProjectListComponent implements OnInit {
	projects = [
		{
			name: '企业协作平台',
			desc: '这是一个企业内部项目',
			coverImg: 'assets/img/covers/0.jpg'
		},
		{
			name: '企业协作平台',
			desc: '这是一个企业内部项目',
			coverImg: 'assets/img/covers/1.jpg'
		}
	]

	constructor(public dialog: MatDialog) {}

	ngOnInit() {}

	openNewProjectDialog(): void {
		const dialogRef = this.dialog.open(NewProjectComponent, {
			data: { name: 'xxxxxxxxxxxxxxxxx' }
		})

		dialogRef.afterClosed().subscribe(result => {
			console.log(result)
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

	openDeleteProjectDialog() {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			data: {
				title: '删除项目'
			}
		})
		dialogRef.afterClosed().subscribe(result => {
			console.log('detele project:', result)
		})
	}
}
