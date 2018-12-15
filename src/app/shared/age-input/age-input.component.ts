import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms'
import { Observable, combineLatest } from 'rxjs'
import { merge, map, filter, startWith } from 'rxjs/operators'
import { AgeUnit } from './models'
import { validateAge, validateBirthday, convertAgeToDate } from './validators'

@Component({
	selector: 'app-age-input',
	templateUrl: './age-input.component.html',
	styleUrls: [ './age-input.component.scss' ]
})
export class AgeInputComponent implements OnInit {
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
			birthday: [ '', Validators.compose([ Validators.required, validateBirthday ]) ],
			age: this.fb.group(
				{
					ageNum: [ '', Validators.compose([ Validators.min(1) ]) ],
					ageUnit: [ '' ]
				},
				{ validator: validateAge('ageNum', 'ageUnit') }
			)
		})

		this.birthday = this.form.get('birthday')
		this.age = this.form.get('age') as FormGroup
		this.ageNum = this.form.get('age.ageNum')
		this.ageUnit = this.form.get('age.ageUnit')

		this.ageUnit.setValue(AgeUnit.Year)

		this.startObserveForm()
	}

	startObserveForm() {
		this.birthday$ = this.birthday.valueChanges.pipe(
			map(v => {
				return {
					from: 'birthday',
					date: v
				}
			}),
			filter(v => !!!validateBirthday(this.birthday))
		)
		this.ageNum$ = this.ageNum.valueChanges.pipe(startWith(this.ageNum.value))
		this.ageUnit$ = this.ageUnit.valueChanges.pipe(startWith(this.ageUnit.value))
		this.age$ = combineLatest(this.ageNum$, this.ageUnit$).pipe(
			map(v => {
				const date = convertAgeToDate(v[0], v[1])
				return {
					from: 'age',
					date: date
				}
			}),
			filter(v => !!!validateAge('ageNum', 'ageUnit')(this.age))
		)

		// Merged$ from birthday$ and age$
		const merged$: Observable<{ from: string; date: Date }> = this.birthday$.pipe(
			merge(this.age$)
		)

		// Subscribe
		const mergedSubscription = merged$.subscribe(v => {
			console.log(v)

			if (v.from == 'birthday') {
			}

			if (v.from == 'age') {
			}
		})
	}
}
