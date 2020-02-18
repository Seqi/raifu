import { toEntity } from '../models/entity.model'
import { CloudFunction } from '../../../functions'

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