import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { AppState } from 'src/app/store'
import { Observable } from 'rxjs'
import { getIsLoggedIn } from 'src/app/auth/store/selectors/auth.selectors'
import { LogoutAction } from 'src/app/auth/store/actions/auth.actions'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(getIsLoggedIn))
  }

  logout() {
    this.store.dispatch(new LogoutAction())
  }
}
