import CloudFunction from '../cloud-function'
import { toEntity } from 'app/data/models/entity.model'

export default {
	get: () =>
		new CloudFunction()
			.path('armory')
			.get()
			.then((result) =>
				Object.keys(result)
					.reduce((current, key) => {
						current[key] = result[key].map(toEntity)
						return current
					}, {})
			)
}
