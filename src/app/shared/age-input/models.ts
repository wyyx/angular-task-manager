export enum AgeUnit {
	Year = 0,
	Month,
	Day
}

export interface Age {
	age: number
	unit: AgeUnit
}
