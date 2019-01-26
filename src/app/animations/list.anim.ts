import {
  trigger,
  state,
  style,
  transition,
  animation,
  animate,
  group,
  query,
  stagger,
  animateChild
} from '@angular/animations'

export const listAnim = trigger('listAnim', [
  transition(':increment', [
    query(
      ':enter',
      [
        style({ transform: 'scale(0)', opacity: 0 }),
        stagger(100, [
          group([
            animate('0.5s ease-in-out', style({ transform: 'scale(1)' })),
            animate('0.5s ease-in-out', style({ opacity: 1 }))
          ])
        ])
      ],
      { optional: true }
    )
  ]),
  transition(':decrement', [
    query(
      ':leave',
      [
        style({ transform: 'scale(1)', opacity: 1 }),
        stagger(100, [
          group([
            animate('0.2s ease-in-out', style({ transform: 'scale(0)' })),
            animate('0.2s ease-in-out', style({ opacity: 0 }))
          ])
        ])
      ],
      { optional: true }
    )
  ])
])
