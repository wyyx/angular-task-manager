import {
	trigger,
	state,
	style,
	transition,
	animation,
	animate,
	group,
	query,
	stagger
} from '@angular/animations'

export const listAnim = trigger('list', [
	transition('* => *', [
		query(
			':enter',
			[
				style({ transform: 'scale(0)', opacity: 0 }),
				group([
					animate('0.5s ease-in-out', style({ transform: 'scale(1)' })),
					animate('0.5s ease-in-out', style({ opacity: 1 }))
				])
			],
			{ optional: true }
		),
		query(':enter', stagger(100, [ animate('1s', style({ opacity: 1 })) ]), {
			optional: true
		}),
		query(
			':leave',
			[
				style({ transform: 'scale(1)', opacity: 1 }),
				group([
					animate('0.5s', style({ transform: 'scale(0)' })),
					animate('0.5s', style({ opacity: 0 }))
				])
			],
			{ optional: true }
		),
		query(':leave', stagger(100, [ animate('1s', style({ opacity: 0 })) ]), { optional: true })
	])
])
