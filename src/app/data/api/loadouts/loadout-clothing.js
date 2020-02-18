import { CloudFunction } from '../../../functions'
import { toEntity } from '../models/entity.model'

export default (loadoutId) => ({
	add: (clothingId) =>
		new CloudFunction()
			.path(`/loadouts/${loadoutId}/clothing/${clothingId}`)
			.post()
			.then(toEntity),
	delete: (clothingId) =>
		new CloudFunction()
			.path(`/loadouts/${loadoutId}/clothing/${clothingId}`)
			.delete()
			.then(toEntity)
})
