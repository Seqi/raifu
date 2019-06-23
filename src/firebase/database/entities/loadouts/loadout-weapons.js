import { CloudFunction } from '../../../functions/functions'
import { toEntity } from '../entity.model'
import loadoutWeaponAttachments from './loadout-weapon-attachments'

export default (loadoutId) => ({
	add: (weaponId) =>
		new CloudFunction()
			.path(`/loadouts/${loadoutId}/weapons/${weaponId}`)
			.post()
			.then(toEntity),
	delete: (weaponId) =>
		new CloudFunction()
			.path(`/loadouts/${loadoutId}/weapons/${weaponId}`)
			.delete()
			.then(toEntity),			
	weapon: (weaponId) => ({
		attachments: loadoutWeaponAttachments(loadoutId, weaponId)
	})
})
