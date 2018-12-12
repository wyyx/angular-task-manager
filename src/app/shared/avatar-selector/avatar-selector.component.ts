import { Component, OnInit, Input, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS } from '@angular/forms'

@Component({
	selector: 'app-avatar-selector',
	templateUrl: './avatar-selector.component.html',
	styleUrls: [ './avatar-selector.component.scss' ],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AvatarSelectorComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => AvatarSelectorComponent),
			multi: true
		}
	]
})
export class AvatarSelectorComponent implements OnInit, ControlValueAccessor {
	@Input() cols
	@Input() rowHeight = '1:1'
	@Input() title
	@Input() itemWidth
	@Input() useSvgIcon = true
	@Input() items

	selected: string

	private propagate: (_: any) => {}

	constructor() {}

	ngOnInit() {}

	writeValue(obj: any): void {
		this.selected = obj
	}

	registerOnChange(fn: any): void {
		this.propagate = fn
	}

	registerOnTouched(fn: any): void {}

	setDisabledState?(isDisabled: boolean): void {}

	validate(c: FormControl): { [key: string]: any } {
		return this.selected
			? null
			: {
					avatarSelectorInvalid: {
						valid: false
					}
				}
	}

	onAvatarClick(index: number) {
		this.selected = this.items[index]
		this.propagate(this.selected)
	}
}
