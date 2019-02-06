import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Update } from '@ngrx/entity'
import { uniq } from 'lodash'
import { Observable } from 'rxjs'
import { User } from '../auth/models/user.model'
import { BASE_URL } from '../core/core.module'
import { Project } from '../domain/project.model'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly path = 'users'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(@Inject(BASE_URL) private baseUrl: string, private http: HttpClient) {}

  // Search users by email
  get(userId: string): Observable<User> {
    const url = `${this.baseUrl}/${this.path}`

    return this.http
      .get<User[]>(url, {
        headers: this.headers,
        params: { id: userId }
      })
      .pipe(map(users => users && users[0]))
  }

  // Search users by email
  getByIds(userIds: string[]): Observable<User[]> {
    const url = `${this.baseUrl}/${this.path}`

    return this.http.get<User[]>(url, {
      headers: this.headers,
      params: { id: userIds }
    })
  }

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
        id: project.members
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

  // Update user
  update(user: Update<User>) {
    const url = `${this.baseUrl}/${this.path}/${user.id}`

    return this.http.patch<User>(
      url,
      JSON.stringify({
        ...user.changes
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
