import CloudFunction from '../cloud-function'
import { toEntity } from '../../models/entity.model'

export default (loadoutId, weaponId) => ({
	add: (attachmentId) =>
		new CloudFunction()
			.path(`/loadouts/${loadoutId}/weapons/${weaponId}/attachments/${attachmentId}`)
			.post()
			.then(toEntity),
	delete: (attachmentId) =>
		new CloudFunction()
			.path(`/loadouts/${loadoutId}/weapons/${weaponId}/attachments/${attachmentId}`)
			.delete()
			.then(toEntity),
})