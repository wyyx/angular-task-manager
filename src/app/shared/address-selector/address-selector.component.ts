import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core'
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms'
import { Subject } from 'rxjs'
import { distinct, startWith, switchMapTo, takeUntil, tap } from 'rxjs/operators'
import { getCities, getDistricts, getProvinces } from 'src/app/utils/address.util'
import { markFormGroupAsTouched } from 'src/app/utils/form.util'

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.scss'],
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
    this.province = new FormControl('', Validators.required)
    this.city = new FormControl('', Validators.required)
    this.district = new FormControl('')
    this.form = new FormGroup({
      province: this.province,
      city: this.city,
      district: this.district
    })

    this.provinces = getProvinces()

    const province$ = this.province.valueChanges.pipe(
      startWith(''),
      distinct(),
      tap(_ => {
        // Clear city and district when new province comes
        this.city.setValue('')
        this.district.setValue('')
      })
    )
    const city$ = this.city.valueChanges.pipe(
      startWith(''),
      distinct(),
      tap(_ => {
        // Clear district when new city comes
        this.district.setValue('')
      })
    )
    const district$ = this.district.valueChanges.pipe(
      startWith(''),
      distinct()
    )

    province$
      .pipe(
        tap(province => {
          if (province) {
            this.cities = getCities(province)
            this.city.enable()
          } else {
            this.city.disable()
          }
        }),
        switchMapTo(city$),
        tap(city => {
          if (city) {
            this.districts = getDistricts(this.province.value, city)
            this.district.enable()
          } else {
            this.district.disable()
          }
        }),
        switchMapTo(district$),
        tap(() => {
          this.propageteChangeAsync(this.province.value, this.city.value, this.district.value)
        }),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  markAsTouched() {
    markFormGroupAsTouched(this.form)
  }

  propageteChangeAsync(province, city, district) {
    console.log('address', { province, city, district })
    setTimeout(() => {
      this.propagateChange({ province, city, district })
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
