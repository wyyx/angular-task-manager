import { Component, OnInit, ViewChild, forwardRef, Input } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms'
import { Observable, combineLatest, merge } from 'rxjs'
import { map, filter, startWith, tap } from 'rxjs/operators'
import { AgeUnit } from './models'
import { validateAge, validateBirthday, convertAgeToDate, isValidDate } from './validators'
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns'
import { debug } from '../../utils/debug'
import { markFormGroupAsTouched } from 'src/app/utils/form.util'

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements OnInit, ControlValueAccessor {
  propagateChange
  propagateTouched

  ageUnits = [
    { value: AgeUnit.Year, label: '岁' },
    { value: AgeUnit.Month, label: '月' },
    { value: AgeUnit.Day, label: '天' }
  ]
  // Form
  form: FormGroup
  birthday: AbstractControl
  age: FormGroup
  ageNum: AbstractControl
  ageUnit: AbstractControl

  // Form observables
  birthday$: Observable<any>
  age$: Observable<any>
  ageNum$: Observable<any>
  ageUnit$: Observable<any>

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['', Validators.compose([Validators.required, validateBirthday])],
      age: this.fb.group(
        {
          ageNum: ['', Validators.compose([Validators.min(1)])],
          ageUnit: ['']
        },
        { validator: validateAge('ageNum', 'ageUnit') }
      )
    })

    this.birthday = this.form.get('birthday')
    this.age = this.form.get('age') as FormGroup
    this.ageNum = this.form.get('age.ageNum')
    this.ageUnit = this.form.get('age.ageUnit')

    this.ageUnit.setValue(AgeUnit.Year)

    setTimeout(() => {
      this.startObserveForm()
    }, 10)
  }

  markAsTouched() {
    markFormGroupAsTouched(this.form)
  }

  writeValue(obj: any): void {
    this.birthday.setValue(obj)
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn
  }

  onFocusOut(event: Event) {
    this.propagateTouched(event)
  }

  startObserveForm() {
    this.birthday$ = this.birthday.valueChanges.pipe(
      startWith(this.birthday.value),
      // debug('birthday'),
      map(v => {
        const date = new Date(v)
        return {
          from: 'birthday',
          date: isValidDate(date) ? date : null
        }
      })
    )

    this.ageNum$ = this.ageNum.valueChanges.pipe(startWith(this.ageNum.value))

    this.ageUnit$ = this.ageUnit.valueChanges.pipe(
      startWith(this.ageUnit.value),
      // When ageUnit changed set ageNum's value with current value for updating
      // ageNum$ last value
      tap(v => this.ageNum.setValue(this.ageNum.value))
    )

    this.age$ = combineLatest(this.ageNum$, this.ageUnit$).pipe(
      // debug('age'),
      map(v => {
        const date = convertAgeToDate(v[0], v[1])
        return {
          from: 'age',
          date: isValidDate(date) ? date : null
        }
      })
    )

    // Merged$ from birthday$ and age$
    const merged$: Observable<{ from: string; date: Date }> = merge(this.birthday$, this.age$)

    // Subscribe
    const mergedSubscription = merged$.subscribe(v => {
      // console.log(v)

      const currentAgeUint = this.ageUnit.value
      const now = Date.now()

      if (v.from == 'birthday' && v.date) {
        switch (currentAgeUint) {
          case AgeUnit.Year:
            this.ageNum.setValue(differenceInYears(now, v.date), {
              emitEvent: false
            })
            break
          case AgeUnit.Month:
            this.ageNum.setValue(differenceInMonths(now, v.date), {
              emitEvent: false
            })
            break
          case AgeUnit.Day:
            this.ageNum.setValue(differenceInDays(now, v.date), {
              emitEvent: false
            })
            break
          default:
            break
        }

        this.propagateChange(v.date.toDateString())
      }

      if (v.from == 'age' && v.date) {
        this.birthday.setValue(v.date, {
          emitEvent: false
        })

        this.propagateChange(v.date.toDateString())
      }
    })
  }
}
