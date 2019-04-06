import app from '../../../'
import loadoutWeaponAttachments from './loadout-weapon-attachments'

export default (loadoutId) => ({
	add: (weaponId) =>
		app
			.functions()
			.httpsCallable('loadouts-weapons-add')({ weaponId, loadoutId })
			.then((result) => result.data),
	delete: (weaponId) =>
		app
			.functions()
			.httpsCallable('loadouts-weapons-delete')({ weaponId, loadoutId })
			.then((result) => result.data),
	weapon: (weaponId) => ({
		attachments: loadoutWeaponAttachments(loadoutId, weaponId)
	})
})
