import { toEntity } from 'app/data/models/entity.model'

import CloudFunction from '../cloud-function'

const armory = {
	get: (): any =>
		new CloudFunction()
			.path('armory')
			.get()
			.then((result) =>
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				Object.keys(result).reduce((current, key) => {
					// eslint-disable-next-line no-param-reassign
					current[key] = result[key].map(toEntity)
					return current
				}, {} as any)
			),
}

export default armory
