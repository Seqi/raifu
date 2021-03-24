import CloudFunction from '../cloud-function'
import { toEntity } from '../../models/entity.model'

export default function loadoutWeaponAttachments(loadoutId: string, weaponId: string) {
	return {
		add: (attachmentId: string) =>
			new CloudFunction()
				.path(`/loadouts/${loadoutId}/weapons/${weaponId}/attachments/${attachmentId}`)
				.post()
				.then(toEntity),
		delete: (attachmentId: string) =>
			new CloudFunction()
				.path(`/loadouts/${loadoutId}/weapons/${weaponId}/attachments/${attachmentId}`)
				.delete()
				.then(toEntity),
	}
}
