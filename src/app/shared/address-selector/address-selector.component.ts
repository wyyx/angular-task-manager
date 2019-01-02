import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core'
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subject, Observable, from, of, combineLatest } from 'rxjs'
import { getProvinces, getCities, getDistricts } from 'src/app/utils/address.util'
import {
	filter,
	takeUntil,
	mergeMap,
	tap,
	startWith,
	switchMap,
	map,
	take,
	distinct,
	mapTo
} from 'rxjs/operators'

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
		let provinceTemp
		let cityTemp

		const province$ = this.province.valueChanges.pipe(
			startWith(''),
			distinct(),
			tap(_ => {
				this.city.setValue('')
				this.district.setValue('')
			})
		)
		const city$ = this.city.valueChanges.pipe(startWith(''), distinct())
		const district$ = this.district.valueChanges.pipe(startWith(''), distinct())

		combineLatest(province$, city$, district$)
			.pipe(
				switchMap(_ => of(this.province.value)),
				switchMap(province => {
					provinceTemp = province
					if (province) {
						this.cities = getCities(province)
						this.city.enable()
					} else {
						this.city.disable()
					}

					return of(this.city.value)
				}),
				switchMap(city => {
					cityTemp = city
					if (city) {
						this.districts = getDistricts(this.province.value, city)
						this.district.enable()
					} else {
						this.district.disable()
					}

					const address: [any, any, any] = [ provinceTemp, cityTemp, this.district.value ]
					console.log(address)
					this.propageteChangeAsync(address)

					return of(null)
				}),
				takeUntil(this.kill$)
			)
			.subscribe()
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