import { toEntity } from '../entity.model'
import { CloudFunction } from '../../../functions'

export default {
	get: () =>
		new CloudFunction()
			.path('armory')
			.get()
			.then((result) => {
				// TODO: Use reduce
				Object.keys(result)
					.forEach(key => {
						result[key] = result[key].map(toEntity)
					})

				return result
			}),
}