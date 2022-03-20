import { toEntity } from 'app/data/models/entity.model'

import CloudFunction from '../cloud-function'

const armory = {
	get: (): any =>
		new CloudFunction()
			.path('armory')
			.get()
			.then((result) =>
				Object.keys(result).reduce((current, key) => {
					current[key] = result[key].map(toEntity)
					return current
				}, {} as any)
			),
}

export default armory
