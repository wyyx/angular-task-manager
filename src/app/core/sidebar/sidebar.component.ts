import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { Observable } from 'rxjs'
import { getIsLoggedIn } from 'src/app/auth/store/selectors/auth.selectors'
import { LogoutAction } from 'src/app/auth/store/actions/auth.actions'
import { MatSidenav } from '@angular/material'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>

  constructor(private store: Store<AppState>, private sideNav: MatSidenav) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(getIsLoggedIn))
  }

  logout() {
    this.hideSideNav()
    this.store.dispatch(new LogoutAction())
  }

  hideSideNav() {
    this.sideNav.close()
  }
}
