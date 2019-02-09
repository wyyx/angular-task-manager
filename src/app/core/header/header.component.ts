import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { getIsLoggedIn, getUser } from 'src/app/auth/store/selectors/auth.selectors'
import { LogoutAction } from 'src/app/auth/store/actions/auth.actions'
import { User } from 'src/app/auth/models/user.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>()
  @Output() toggleTheme = new EventEmitter<boolean>()
  loggedIn$: Observable<boolean>
  user$: Observable<User>

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.loggedIn$ = this.store.pipe(select(getIsLoggedIn))
    this.user$ = this.store.pipe(select(getUser))
  }

  onToggleSidenav() {
    this.toggleSidenav.emit()
  }

  onToggleTheme(checked: boolean) {
    this.toggleTheme.emit(checked)
  }

  logout() {
    this.store.dispatch(new LogoutAction())
  }
}
