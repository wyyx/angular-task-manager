import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Project } from '../domain/project.model'
import { BASE_URL } from '../core/core.module'
import { Observable, from } from 'rxjs'
import { mergeMap, count, switchMap, map } from 'rxjs/operators'
import { TaskList } from '../domain/task-list.model'
import { Task } from '../domain/task.model'
import { User } from '../auth/models/user.model'
import { ProjectService } from './project.service'
import { uniq } from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly path = 'users'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: HttpClient,
    private projectService: ProjectService
  ) {}

  // Search users by email
  searchUsers(filter: string): Observable<User[]> {
    const url = `${this.baseUrl}/${this.path}`

    return this.http.get<User[]>(url, {
      headers: this.headers,
      params: { email_like: filter }
    })
  }

  // Get users of one project
  getUsersByProject(project: Project): Observable<User[]> {
    const url = `${this.baseUrl}/${this.path}`

    return this.http.get<User[]>(url, {
      headers: this.headers,
      params: {
        projectIds_like: project.id
      }
    })
  }

  // Add projectRef to a user
  addProjectRef(user: User, project: Project): Observable<User> {
    const url = `${this.baseUrl}/${this.path}/${user.id}`
    const projectIds = user.projectIds ? user.projectIds : []

    return this.http.patch<User>(
      url,
      JSON.stringify({
        projectIds: uniq([...projectIds, project.id])
      }),
      { headers: this.headers }
    )
  }

  // Remove projectRef from a user
  removeProjectRef(user: User, project: Project): Observable<User> {
    const url = `${this.baseUrl}/${this.path}`
    const projectIds = user.projectIds ? user.projectIds : []
    const index = projectIds.findIndex(id => id == project.id)
    projectIds.splice(index, 1)

    return this.http.patch<User>(
      url,
      JSON.stringify({
        projectIds: [...projectIds]
      }),
      { headers: this.headers }
    )
  }
}
