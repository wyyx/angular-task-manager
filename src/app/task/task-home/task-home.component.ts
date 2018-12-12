import { Component, OnInit, HostBinding } from '@angular/core'
import { MatDialog } from '@angular/material'
import { NewTaskComponent } from '../new-task/new-task.component'
import { CopyTaskComponent } from '../copy-task/copy-task.component'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { ModifyTaskListNameComponent } from '../modify-task-list-name/modify-task-list-name.component'
import { EditTaskComponent } from '../edit-task/edit-task.component'
import { NewTaskListComponent } from '../new-task-list/new-task-list.component'
import { slideToRight } from 'src/app/animations/route.anim'
import { DragData } from 'src/app/directive/drag-drop.service'

@Component({
	selector: 'app-task-home',
	templateUrl: './task-home.component.html',
	styleUrls: [ './task-home.component.scss' ],
	animations: [ slideToRight ]
})
export class TaskHomeComponent implements OnInit {
	lists = [
		{
			id: 1,
			name: '待办',
			tasks: [
				{
					id: 1,
					desc: '订一张去深圳的机票和酒店，切记准时到达现场',
					completed: false,
					priority: 1,
					owner: {
						id: 1,
						name: '张三',
						avatar: 'avatars:svg-11'
					},
					dueDate: new Date(),
					reminderDate: new Date()
				},
				{
					id: 2,
					desc: '睡觉',
					completed: false,
					priority: 2,
					owner: {
						id: 2,
						name: '李四',
						avatar: 'avatars:svg-5'
					},
					dueDate: new Date()
				},
				{
					id: 3,
					desc: '考试',
					completed: false,
					priority: 2,
					dueDate: new Date()
				}
			]
		},
		{
			id: 2,
			name: '进行中',
			tasks: [
				{
					id: 3,
					desc: '测试新产品',
					completed: false,
					priority: 2,
					owner: {
						id: 1,
						name: '张三',
						avatar: 'avatars:svg-11'
					},
					dueDate: new Date()
				}
			]
		},
		{
			id: 3,
			name: '已完成',
			tasks: [
				{
					id: 5,
					desc: '参加讨论',
					completed: true,
					priority: 3,
					owner: {
						id: 1,
						name: '张三',
						avatar: 'avatars:svg-11'
					},
					dueDate: new Date()
				}
			]
		}
	]
	@HostBinding('@routeAnim') state
	constructor(public dialog: MatDialog) {}
	ngOnInit() {}

	openNewTaskDialog() {
		this.dialog.open(NewTaskComponent)
	}

	openMoveAllDialog() {
		this.dialog.open(CopyTaskComponent, { data: { lists: this.lists } })
	}

	openConfirmDialog() {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			data: {
				title: '删除列表'
			}
		})

		dialogRef.afterClosed().subscribe(result => {
			console.log('deleteList:', result)
		})
	}

	openModifyListNameDialog(name: string) {
		this.dialog.open(ModifyTaskListNameComponent, {
			data: {
				name: name
			}
		})
	}

	openEditTaskDialog(task) {
		this.dialog.open(EditTaskComponent, {
			data: { task: task }
		})
	}

	openNewTaskListDialog() {
		this.dialog.open(NewTaskListComponent)
	}

	onDropped(dragData: DragData) {
		console.log('onDropped()', dragData)
		switch (dragData.tag) {
			case 'task-item':
				console.log('handling task-item')
				break
			case 'task-list':
				console.log('handling task-item')
				break
		}
	}

	onQuickTask(desc: string) {
		console.log('desc', desc)
	}
}
