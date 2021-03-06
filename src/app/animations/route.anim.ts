import { trigger, state, style, transition, animate, group } from '@angular/animations'

export const slideToRightAnim = trigger('slideToRightAnim', [
  state(
    'void',
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    })
  ),
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    group([animate('0.5s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))])
  ]),
  transition(':leave', [
    style({
      transform: 'translateX(0)',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }),
    group([animate('0.3s ease-in-out', style({ transform: 'translateX(100%)', opacity: 0 }))])
  ])
])
