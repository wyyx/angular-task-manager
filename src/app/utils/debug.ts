import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { tap } from 'rxjs/operators'

export const debug = message => {
	return tap({
		next(v) {
			console.log(message, v)
		},
		error(e) {
			console.log('Error', message, e)
		},
		complete() {
			console.log('Completed')
		}
	})
}
