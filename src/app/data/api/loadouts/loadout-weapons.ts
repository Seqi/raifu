import CloudFunction from '../cloud-function'
import { toEntity } from '../../models/entity.model'
import loadoutWeaponAttachments from './loadout-weapon-attachments'

export default function loadoutWeapons(loadoutId: string) {
	return {
		add: (weaponId: string) =>
			new CloudFunction()
				.path(`/loadouts/${loadoutId}/weapons/${weaponId}`)
				.post()
				.then(toEntity),
		delete: (weaponId: string) =>
			new CloudFunction()
				.path(`/loadouts/${loadoutId}/weapons/${weaponId}`)
				.delete()
				.then(toEntity),
		weapon: (weaponId: string) => ({
			attachments: loadoutWeaponAttachments(loadoutId, weaponId),
		}),
	}
}
