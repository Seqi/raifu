import CloudFunction from '../cloud-function'
import { toEntity } from '../../models/entity.model'

export default function loadoutGear(loadoutId) {
	return ({
		add: (gearId) => new CloudFunction()
			.path(`/loadouts/${loadoutId}/gear/${gearId}`)
			.post()
			.then(toEntity),
		delete: (gearId) => new CloudFunction()
			.path(`/loadouts/${loadoutId}/gear/${gearId}`)
			.delete()
			.then(toEntity)
	})
}
