import app from '../../../'
import { toEntity } from '../entity.model'
import loadoutWeaponAttachments from './loadout-weapon-attachments'
import errorCheck from '../../utils/error-check'

export default (loadoutId) => ({
	add: (weaponId) =>
		app
			.functions()
			.httpsCallable('loadouts-weapons-add')({ weaponId, loadoutId })
			.then(errorCheck)
			.then((result) => toEntity(result.data)),
	delete: (weaponId) =>
		app
			.functions()
			.httpsCallable('loadouts-weapons-delete')({ weaponId, loadoutId })
			.then(errorCheck)
			.then((result) => result.data),
	weapon: (weaponId) => ({
		attachments: loadoutWeaponAttachments(loadoutId, weaponId)
	})
})
