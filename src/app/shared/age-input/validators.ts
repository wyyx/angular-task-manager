import {
	getYear,
	differenceInYears,
	isDate,
	isFuture,
	subYears,
	subMonths,
	subDays
} from 'date-fns'
import { AbstractControl, FormGroup } from '@angular/forms'
import { AgeUnit } from './models'

export function validateBirthday(control: AbstractControl): { [key: string]: any } | null {
	const date = control.value

	return isValidDate(date)
		? null
		: {
				birthdayValidation: {
					errorMessage: '日期不合法'
				}
			}
}

export function isValidDate(date) {
	const now = new Date()
	return isDate(date) && !isFuture(date) && differenceInYears(now, date) < 150 ? true : false
}

// console.log(isValidDate(subYears(Date.now(), 180)))

export function validateAge(ageNumKey: string, ageUnitKey: string) {
	return (group: FormGroup): { [key: string]: any } => {
		const ageNum = group.get(ageNumKey).value
		const ageUnit = group.get(ageUnitKey).value

		const date = convertAgeToDate(ageNum, ageUnit)
		// console.log('date', date)
		// console.log('isValidDate(date)', isValidDate(date))
		return isValidDate(date)
			? null
			: {
					ageValidation: {
						errorMessage: '年龄不合法'
					}
				}
	}
}

export function convertAgeToDate(ageNum, ageUnit) {
	const now = Date.now()
	let date = null

	if (!ageNum) {
		return null
	}

	switch (ageUnit) {
		case AgeUnit.Year:
			date = subYears(now, ageNum)
			break
		case AgeUnit.Month:
			date = subMonths(now, ageNum)
			break
		case AgeUnit.Day:
			date = subDays(now, ageNum)
			break
		default:
			break
	}
	return date
}
