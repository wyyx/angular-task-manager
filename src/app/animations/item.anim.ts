import { trigger, state, style, transition, animation, animate } from '@angular/animations'

export const itemAnim = trigger('itemAnim', [
  state('out', style({ 'border-left-width': '3px' })),
  state('hover', style({ 'border-left-width': '6px' })),
  transition('out => hover', animate('100ms ease-in')),
  transition('hover => out', animate('100ms ease-out'))
])
