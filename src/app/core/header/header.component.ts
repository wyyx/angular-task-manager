import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { getLoggedIn } from 'src/app/auth/store/selectors/auth.selectors'
import { LogoutAction } from 'src/app/auth/store/actions/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>()
  @Output() toggleTheme = new EventEmitter<boolean>()
  loggedIn$: Observable<boolean>

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.loggedIn$ = this.store.pipe(select(getLoggedIn))
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
