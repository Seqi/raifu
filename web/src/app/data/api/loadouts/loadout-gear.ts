import CloudFunction from '../cloud-function'
import { toEntity } from '../../models/entity.model'

export default function loadoutGear(loadoutId: string) {
	return {
		add: (gearId: string) =>
			new CloudFunction()
				.path(`/loadouts/${loadoutId}/gear/${gearId}`)
				.post()
				.then(toEntity),
		delete: (gearId: string) =>
			new CloudFunction()
				.path(`/loadouts/${loadoutId}/gear/${gearId}`)
				.delete()
				.then(toEntity),
	}
}
