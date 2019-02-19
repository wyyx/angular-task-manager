import { BreakpointObserver } from '@angular/cdk/layout'
import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MediaClassService {
  private r2: Renderer2
  constructor(private breakpoint: BreakpointObserver, rendererFactory: RendererFactory2) {
    this.r2 = rendererFactory.createRenderer(null, null)
  }

  toggleClass(el: ElementRef, querys: string | string[], className: string) {
    this.breakpoint
      .observe(querys)
      .pipe(
        tap(state => {
          if (state.matches) {
            this.r2.addClass(el.nativeElement, className)
          } else {
            this.r2.removeClass(el.nativeElement, className)
          }
        })
      )
      .subscribe()
  }
}
