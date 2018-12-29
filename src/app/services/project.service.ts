import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Project } from '../domain/project.model'
import { BASE_URL } from '../core/core.module'
import { Observable, from } from 'rxjs'
import { mergeMap, count, switchMap, map } from 'rxjs/operators'
import { TaskList } from '../domain/task-list.model'
import { Task } from '../domain/task.model'

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	private readonly path = 'projects'
	private headers = new HttpHeaders({
		'Content-Type': 'application/json'
	})

	constructor(
		@Inject(BASE_URL) private baseUrl: string,
		private http: HttpClient
	) {}

	// POST
	add(project: Project): Observable<Project> {
		project.id = null
		const url = `${this.baseUrl}/${this.path}`

		return this.http.post<Project>(url, JSON.stringify(project), {
			headers: this.headers
		})
	}

	// UPDATE
	update(project: Project): Observable<Project> {
		const url = `${this.baseUrl}/${this.path}/${project.id}`
		const partProject = {
			name: project.name,
			desc: project.desc,
			coverImg: project.coverImg
		}

		return this.http.patch<Project>(url, JSON.stringify(partProject), {
			headers: this.headers
		})
	}

	// DELETE
	delete(project: Project): Observable<Project> {
		const url = `${this.baseUrl}/${this.path}/${project.id}`

		return from(project.taskLists).pipe(
			mergeMap(tasklistId =>
				this.http.delete<TaskList>(
					`${this.baseUrl}/taskList/${tasklistId}`
				)
			),
			count(),
			switchMap(count => this.http.delete<Project>(url)),
			map(_ => project)
		)
	}

	// GET
	get(userId: string): Observable<Project[]> {
		const url = `${this.baseUrl}/${this.path}`

		return this.http.get<Project[]>(url, {
			headers: this.headers,
			params: {
				members_like: userId
			}
		})
	}
}
