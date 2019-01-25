import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { BASE_URL } from '../../core/core.module'
import { Observable, from, of } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators'
import { User } from '../models/user.model'
import { Auth } from '../../domain/auth.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly path = 'users'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Iua1i-ivleeahOeUqOaIt-WQjSIsImlhdCI6MTUxNjIzOTAyMn0.6tgqSnHwsHajMHNrZQMA2vul6OR6uEuMme6GSFhG3sI'

  constructor(@Inject(BASE_URL) private baseUrl: string, private http: HttpClient) {}

  register(user: User): Observable<Auth> {
    const url = `${this.baseUrl}/${this.path}`

    return this.http
      .get<User[]>(url, {
        headers: this.headers,
        params: {
          email: user.email
        }
      })
      .pipe(
        mergeMap(users => {
          if (users.length > 0) {
            throw 'user exists'
          } else {
            return this.http.post<User>(url, JSON.stringify(user), {
              headers: this.headers
            })
          }
        }),
        map(returnedUser => ({ token: this.token, user: returnedUser }))
      )
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/${this.path}`

    return this.http.get<User[]>(url, { headers: this.headers, params: { email, password } }).pipe(
      map(users => {
        if (users.length == 0) {
          throw 'login failed'
        } else {
          return { token: this.token, user: users[0] }
        }
      })
    )
  }
}
