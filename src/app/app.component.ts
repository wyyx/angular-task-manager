import { Component, OnInit, OnDestroy } from '@angular/core'
import { OverlayContainer } from '@angular/cdk/overlay'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { tap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  kill$: Subject<any> = new Subject()

  isDarkTheme = false
  squareState = 'red'
  mode = 'side'

  constructor(private oc: OverlayContainer, private breakpoint: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpoint
      .observe([`${Breakpoints.Handset}`, `${Breakpoints.Small}`])
      .pipe(
        tap(state => {
          if (state.matches) {
            this.mode = 'over'
          } else {
            this.mode = 'side'
          }
        }),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  onToggleTheme(checked: boolean) {
    this.isDarkTheme = checked

    let theme = 'my-dark-theme'
    if (this.isDarkTheme) {
      this.oc.getContainerElement().classList.add(theme)
    } else {
      this.oc.getContainerElement().classList.remove(theme)
    }
  }
}
