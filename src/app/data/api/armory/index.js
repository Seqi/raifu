import CloudFunction from '../cloud-function'
import ArmoryItem from '../../models/armory-item.model'

export default {
	get: () =>
		new CloudFunction()
			.path('armory')
			.get()
			.then((result) => 
				Object.keys(result)
					.reduce((current, key) => {						
						current[key] = result[key].map(e => new ArmoryItem(e))
						return current
					}, {})
			)
}