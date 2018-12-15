import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { tap } from 'rxjs/operators'

const debug = message => {
	return tap({
		next(v) {
			if (!environment.production) {
				console.log(message, v)
			}
		},
		error(e) {
			if (!environment.production) {
				console.log('Error', message, e)
			}
		},
		complete() {
			if (!environment.production) {
				console.log('Completed')
			}
		}
	})
}
