import {
	Component,
	OnInit,
	HostBinding,
	Inject,
	PLATFORM_INITIALIZER,
	APP_BOOTSTRAP_LISTENER
} from '@angular/core'
import { MatDialog } from '@angular/material'
import { InviteComponent } from '../invite/invite.component'
import { EditProjectComponent } from '../edit-project/edit-project.component'
import { NewProjectComponent } from '../new-project/new-project.component'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { slideToRight } from 'src/app/animations/route.anim'
import { listAnim } from 'src/app/animations/list.anim'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator } from '@angular/forms'

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: [ './project-list.component.scss' ],
	animations: [ slideToRight, listAnim ]
})
export class ProjectListComponent implements OnInit {
	projects = [
		{
			id: 1,
			name: '企业协作平台',
			desc: '这是一个企业内部项目',
			coverImg: 'assets/img/covers/0.jpg'
		},
		{
			id: 2,
			name: '企业协作平台',
			desc: '这是一个企业内部项目',
			coverImg: 'assets/img/covers/1.jpg'
		}
	]

	@HostBinding('@routeAnim') state

	constructor(public dialog: MatDialog) {}

	ngOnInit() {}

	openNewProjectDialog(): void {
		const dialogRef = this.dialog.open(NewProjectComponent, {
			data: { name: 'xxxxxxxxxxxxxxxxx' }
		})

		dialogRef.afterClosed().subscribe(result => {
			console.log(result)
			if (result) {
				this.projects = [
					...this.projects,
					{
						id: 3,
						name: '企业协作平台',
						desc: '这是一个企业内部项目',
						coverImg: 'assets/img/covers/2.jpg'
					},
					{
						id: 4,
						name: '企业协作平台',
						desc: '这是一个企业内部项目',
						coverImg: 'assets/img/covers/3.jpg'
					}
				]
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
