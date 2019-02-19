import { Directive, ElementRef, OnInit } from '@angular/core'
import { MediaClassService } from '../services/media-class.service'
import { DEFAULT_BREAKPOINTS } from './break-points'

const INPUTS = [
  'mediaClass.xs',
  'mediaClass.sm',
  'mediaClass.md',
  'mediaClass.lg',
  'mediaClass.xl',
  'mediaClass.lt-sm',
  'mediaClass.lt-md',
  'mediaClass.lt-lg',
  'mediaClass.lt-xl',
  'mediaClass.gt-xs',
  'mediaClass.gt-sm',
  'mediaClass.gt-md',
  'mediaClass.gt-lg',
  'mediaClass.h',
  'mediaClass.t',
  'mediaClass.w',
  'mediaClass.h-p',
  'mediaClass.t-p',
  'mediaClass.w-p',
  'mediaClass.h-l',
  'mediaClass.t-l',
  'mediaClass.w-l'
]
const SELECTOR = `
  [mediaClass.xs], [mediaClass.sm], [mediaClass.md],
  [mediaClass.lg], [mediaClass.xl], [mediaClass.lt-sm], [mediaClass.lt-md],
  [mediaClass.lt-lg], [mediaClass.lt-xl], [mediaClass.gt-xs], [mediaClass.gt-sm],
  [mediaClass.gt-md], [mediaClass.gt-lg],  [mediaClass.h], [mediaClass.t],
  [mediaClass.w], [mediaClass.h-p], [mediaClass.t-p], [mediaClass.w-p],
  [mediaClass.h-l], [mediaClass.t-l], [mediaClass.w-l]
`

@Directive({
  selector: SELECTOR,
  inputs: INPUTS
})
export class MediaClassDirective implements OnInit {
  constructor(private el: ElementRef, private mediaClassService: MediaClassService) {}

  ngOnInit(): void {
    this.getInputAttributeNodes().forEach(node =>
      this.mediaClassService.toggleClass(
        this.el,
        this.getMediaQuery(node),
        this.getMediaClassName(node)
      )
    )
  }

  getInputAttributeNodes(): Attr[] {
    return INPUTS.map(input => (this.el.nativeElement as Element).getAttributeNode(input)).filter(
      node => !!node
    )
  }

  getMediaQuery(node: Attr) {
    return DEFAULT_BREAKPOINTS[node.name.substring(11)]
  }

  getMediaClassName(node: Attr) {
    return node.value
  }
}
