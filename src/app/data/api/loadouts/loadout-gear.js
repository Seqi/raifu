import { CloudFunction } from '../../../functions'
import { toEntity } from '../models/entity.model'

export default (loadoutId) => ({
	add: (gearId) =>
		new CloudFunction()
			.path(`/loadouts/${loadoutId}/gear/${gearId}`)
			.post()
			.then(toEntity),
	delete: (gearId) =>
		new CloudFunction()
			.path(`/loadouts/${loadoutId}/gear/${gearId}`)
			.delete()
			.then(toEntity)
})
