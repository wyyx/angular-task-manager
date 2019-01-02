import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core'
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subject, Observable, from, of, combineLatest } from 'rxjs'
import { getProvinces, getCities, getDistricts } from 'src/app/utils/address.util'
import { filter, takeUntil, mergeMap, tap, startWith } from 'rxjs/operators'

@Component({
	selector: 'app-address-selector',
	templateUrl: './address-selector.component.html',
	styleUrls: [ './address-selector.component.scss' ],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AddressSelectorComponent),
			multi: true
		}
	]
})
export class AddressSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
	kill$: Subject<any> = new Subject()

	form: FormGroup
	province: FormControl
	city: FormControl
	district: FormControl

	provinces: string[]
	cities: string[]
	districts: string[]

	propagateChange
	propagateTouch

	constructor() {}

	ngOnInit() {
		this.province = new FormControl('')
		this.city = new FormControl('')
		this.district = new FormControl('')
		this.form = new FormGroup({
			province: this.province,
			city: this.city,
			district: this.district
		})

		this.provinces = getProvinces()
		combineLatest(
			this.province.valueChanges.pipe(startWith(this.province.value)),
			this.city.valueChanges.pipe(startWith(this.city.value)),
			this.district.valueChanges.pipe(startWith(this.district.value))
		)
			.pipe(takeUntil(this.kill$))
			.subscribe(([ province, city, district ]) => {
				console.log([ province, city, district ])

				if (province) {
					this.cities = getCities(province)
					this.city.enable({ emitEvent: false })
				} else {
					this.city.disable({ emitEvent: false })
				}

				this.districts = getDistricts(province, city)
				if (this.districts) {
					this.district.enable({ emitEvent: false })
				} else {
					// Province changed or first emit
					this.district.disable({ emitEvent: false })
					this.city.setValue('', { emitEvent: false })
					this.district.setValue('', { emitEvent: false })
				}

				this.propageteChangeAsync([
					this.province.value,
					this.city.value,
					this.district.value
				])
			})
	}

	ngOnDestroy(): void {
		this.kill$.next()
		this.kill$.complete()
	}

	propageteChangeAsync([ province, city, district ]) {
		setTimeout(() => {
			this.propagateChange([ province, city, district ])
		}, 0)
	}

	onFocusOut() {
		this.propagateTouch()
	}

	writeValue(obj: any): void {}

	registerOnChange(fn: any): void {
		this.propagateChange = fn
	}

	registerOnTouched(fn: any): void {
		this.propagateTouch = fn
	}
}
