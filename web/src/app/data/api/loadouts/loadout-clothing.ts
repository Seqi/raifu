import CloudFunction from '../cloud-function'
import { toEntity } from '../../models/entity.model'

export default function loadoutClothing(loadoutId: string) {
	return {
		add: (clothingId: string) =>
			new CloudFunction()
				.path(`/loadouts/${loadoutId}/clothing/${clothingId}`)
				.post()
				.then(toEntity),
		delete: (clothingId: string) =>
			new CloudFunction()
				.path(`/loadouts/${loadoutId}/clothing/${clothingId}`)
				.delete()
				.then(toEntity),
	}
}
