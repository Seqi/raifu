import CloudFunction from '../cloud-function'
import { toEntity } from '../../models/entity.model'

export default function loadoutClothing(loadoutId) {
	return ({
		add: (clothingId) => new CloudFunction()
			.path(`/loadouts/${loadoutId}/clothing/${clothingId}`)
			.post()
			.then(toEntity),
		delete: (clothingId) => new CloudFunction()
			.path(`/loadouts/${loadoutId}/clothing/${clothingId}`)
			.delete()
			.then(toEntity)
	})
}
