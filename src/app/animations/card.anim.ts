import { trigger, state, style, transition, animation, animate } from '@angular/animations'

export const cardAnim = trigger('card', [
	state('out', style({ 'box-shadow': 'unset', transform: 'scale(1)' })),
	state(
		'hover',
		style({ 'box-shadow': '3px 3px 5px 3px rgba(0,0,0,0.2)', transform: 'scale(1.05)' })
	),
	transition('out => hover', animate('100ms ease-in')),
	transition('hover => out', animate('100ms ease-out'))
])
