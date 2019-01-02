import { CertificateType } from 'src/app/domain/user.model'

export function validateCertificate(type: CertificateType, number: string) {
	switch (type) {
		case CertificateType.IdCard:
			const patternId = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/
			number.length == 18 || patternId.test(number) ? true : false
			break
		case CertificateType.Insurance:
			// Not validate
			return true
			break
		case CertificateType.Military:
			const patternMilitary = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/
			patternMilitary.test(number) ? true : false
			break
		case CertificateType.Passport:
			const patternPassport = /^[GgEe]\d{8}$/
			patternPassport.test(number) ? true : false
			break
		default:
			return true
			break
	}
}
