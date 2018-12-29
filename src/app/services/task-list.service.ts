import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { BASE_URL } from '../core/core.module'
import { Observable } from 'rxjs'
import { mapTo, mergeMap, switchMap } from 'rxjs/operators'
import { TaskList } from '../domain/task-list.model'

@Injectable({
	providedIn: 'root'
})
export class TaskListService {
	private readonly path = 'taskLists'
	private headers = new HttpHeaders({
		'Content-Type': 'application/json'
	})

	constructor(@Inject(BASE_URL) private baseUrl: string, private http: HttpClient) {}

	// POST
	add(taskList: TaskList): Observable<TaskList> {
		taskList.id = null
		const url = `${this.baseUrl}/${this.path}`

		return this.http.post<TaskList>(url, JSON.stringify(taskList), {
			headers: this.headers
		})
	}

	// UPDATE
	update(taskList: TaskList): Observable<TaskList> {
		const url = `${this.baseUrl}/${this.path}/${taskList.id}`
		const partTaskList = {
			name: taskList.name,
			projectId: taskList.projectId,
			order: taskList.order
		}

		return this.http.patch<TaskList>(url, JSON.stringify(partTaskList), {
			headers: this.headers
		})
	}

	// DELETE
	delete(taskList: TaskList): Observable<TaskList> {
		const url = `${this.baseUrl}/${this.path}/${taskList.id}`

		return this.http
			.delete(url, {
				headers: this.headers
			})
			.pipe(mapTo(taskList))
	}

	// GET
	get(projectId: string): Observable<TaskList[]> {
		const url = `${this.baseUrl}/${this.path}`

		return this.http.get<TaskList[]>(url, {
			headers: this.headers,
			params: {
				projectId: projectId
			}
		})
	}

	switchOrder(sourceList: TaskList, targetList: TaskList) {
		const url = `${this.baseUrl}/${this.path}`
		const sourceOrder = sourceList.order
		const targetOrder = targetList.order
		const partSourceList = {
			order: targetOrder
		}
		const partTargetList = {
			order: sourceOrder
		}

		return this.http
			.patch(`${url}/${sourceList.id}`, partSourceList, { headers: this.headers })
			.pipe(
				switchMap(v =>
					this.http.patch(`${url}/${targetList.id}`, partTargetList, {
						headers: this.headers
					})
				)
			)
	}
}
