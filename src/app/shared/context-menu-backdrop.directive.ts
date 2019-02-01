import { Directive, Input, ElementRef, OnInit, OnChanges, Renderer2 } from '@angular/core'
import { ContextMenuComponent } from './context-menu/context-menu.component'
import { Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'

@Directive({
  selector: '[appContextMenuBackdrop]'
})
export class ContextMenuBackdropDirective implements OnInit {
  kill$: Subject<any> = new Subject()

  @Input('rootMenu') rootMenu: ContextMenuComponent

  constructor(private el: ElementRef, private r2: Renderer2) {}

  ngOnInit(): void {
    const nel = this.el.nativeElement
    console.log(this.el)

    this.r2.setStyle(nel, 'position', 'fixed')
    this.r2.setStyle(nel, 'width', '100%')
    this.r2.setStyle(nel, 'height', '100%')
    this.r2.setStyle(nel, 'display', 'none')

    this.rootMenu.showValueChanges
      .pipe(
        takeUntil(this.kill$),
        tap(show => {
          show
            ? this.r2.setStyle(nel, 'display', 'block')
            : this.r2.setStyle(nel, 'display', 'none')
        })
      )
      .subscribe()
    this.r2.listen(nel, 'click', event => this.rootMenu.closeAllMenu())
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }
}
