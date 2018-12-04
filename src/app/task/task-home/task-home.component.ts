import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-task-home',
	templateUrl: './task-home.component.html',
	styleUrls: [ './task-home.component.scss' ]
})
export class TaskHomeComponent implements OnInit {
	lists = [
		{
			id: 1,
			name: '待办',
			tasks: [
				{
					id: 1,
					desc: '任务一：订一张去深圳的机票',
					owner: {
						id: 1,
						name: '张三',
						avatar: 'avatars:svg-11'
					},
					dueDate: new Date()
				},
				{
					id: 2,
					desc: '任务二：睡觉',
					owner: {
						id: 2,
						name: '李四',
						avatar: 'avatars:svg-5'
					},
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
	constructor() {}

	ngOnInit() {}
}
