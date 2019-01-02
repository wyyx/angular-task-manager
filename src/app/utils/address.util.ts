import { addressData } from './address.data'

export function getProvinces(): string[] {
	const provinces: string[] = []

	for (const key in addressData) {
		if (addressData.hasOwnProperty(key)) {
			provinces.push(key)
		}
	}

	return provinces
}

export function getCities(province: string) {
	const cities: string[] = []

	for (const key in addressData[province]) {
		if (addressData[province].hasOwnProperty(key)) {
			cities.push(key)
		}
	}

	return cities
}

export function getDistricts(province: string, city: string) {
	return addressData && addressData[province] && addressData[province][city]
		? addressData[province][city]
		: null
}
