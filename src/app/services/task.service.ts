import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BASE_URL } from '../core/core.module'
import { Observable, from } from 'rxjs'
import { mapTo, mergeMap, toArray, map } from 'rxjs/operators'
import { Task } from '../domain/task.model'
import { Update } from '@ngrx/entity'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly path = 'tasks'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(@Inject(BASE_URL) private baseUrl: string, private http: HttpClient) {}

  // POST
  add(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${this.path}`

    return this.http.post<Task>(url, JSON.stringify(task), {
      headers: this.headers
    })
  }

  // UPDATE
  update(task: Update<Task>): Observable<Task> {
    const url = `${this.baseUrl}/${this.path}/${task.id}`

    return this.http.patch<Task>(url, JSON.stringify(task.changes), {
      headers: this.headers
    })
  }

  // Move one taskItem to another taskList
  move(taskId, targetListId): Observable<Task> {
    const url = `${this.baseUrl}/${this.path}/${taskId}`
    const partTask = {
      taskListId: targetListId
    }

    return this.http.patch<Task>(url, JSON.stringify(partTask), {
      headers: this.headers
    })
  }

  // Move all taskItems in one taskList to another
  moveAll(sourceListId, targetListId): Observable<Task[]> {
    return this.get(sourceListId).pipe(
      mergeMap(tasks => from(tasks)),
      mergeMap(task => this.move(task.id, targetListId)),
      toArray()
    )
  }

  // DELETE
  delete(taskId: string): Observable<string> {
    const url = `${this.baseUrl}/${this.path}/${taskId}`

    return this.http
      .delete(url, {
        headers: this.headers
      })
      .pipe(mapTo(taskId))
  }

  // GET
  get(taskListId: string): Observable<Task[]> {
    const url = `${this.baseUrl}/${this.path}`

    return this.http.get<Task[]>(url, {
      headers: this.headers,
      params: {
        taskListId: taskListId
      }
    })
  }
}
