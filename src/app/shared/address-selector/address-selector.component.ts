import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Subject, Observable, from, of } from 'rxjs'
import { getProvinces, getCities, getDistricts } from 'src/app/utils/address.util'
import { filter, takeUntil, mergeMap, tap, startWith } from 'rxjs/operators'

@Component({
	selector: 'app-address-selector',
	templateUrl: './address-selector.component.html',
	styleUrls: [ './address-selector.component.scss' ]
})
export class AddressSelectorComponent implements OnInit, OnDestroy {
	kill$: Subject<any> = new Subject()

	form: FormGroup
	province: FormControl
	city: FormControl
	district: FormControl

	provinces: string[]
	cities: string[]
	districts: string[]

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

		of(getProvinces())
			.pipe(
				mergeMap(provinces => {
					// Get provinces
					this.provinces = provinces
					return this.province.valueChanges
				}),
				startWith(this.province.value),
				tap(v => (!!v ? this.city.enable() : this.city.disable())),
				mergeMap(province => {
					// Get cities
					this.cities = province && getCities(province)
					return this.city.valueChanges.pipe(
						startWith(this.city.value),
						tap(v => (!!v ? this.district.enable() : this.district.disable())),
						mergeMap(city => {
							// Get districts
							this.districts = province && city && getDistricts(province, city)
							return of(null)
						})
					)
				}),
				takeUntil(this.kill$)
			)
			.subscribe()
	}

	ngOnDestroy(): void {
		this.kill$.next()
		this.kill$.complete()
	}
}
