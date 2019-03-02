import { database, paths } from '../../'

import weapons from '../armory/weapons'
import loadoutWeaponAttachments from './loadout-weapon-attachments'

export default (loadoutId) => ({
	add: (weaponId) =>
		weapons()
			.getById(weaponId)
			// Add a lookup between this loadout and the new weapon
			.then((snap) => {
				database.ref(`${paths().lookups.loadouts.weapons}/${weaponId}`)
					.update({ [loadoutId]: true })

				return snap
			})
			// Add the weapon object to the loadout itself
			.then((snap) => database.ref(`${paths()
				.loadout(loadoutId).weapons}`)
				.update({ [snap.key]: snap.val() })),

	delete: (weaponId) => {
		let deleteReferences = {
			// Remove weapon itself
			[`${paths()
				.loadout(loadoutId).weapons}/${weaponId}`]: null,

			// Remove lookup
			[`${paths().lookups.loadouts.weapons}/${weaponId}/${loadoutId}`]: null
		}

		return (
			// Load the attachments attached to this weapon
			database
				.ref(
					paths()
						.loadout(loadoutId)
						.weapon(weaponId).attachments
				)
				.once('value')
				.then((snap) => Object.keys(snap.val() || {}))

				// Remove all lookups to attachments on this loadout
				.then((attachmentIds) =>
					attachmentIds.forEach(
						(attachmentId) =>
							(deleteReferences[
								`${paths().lookups.loadouts.attachments}/${attachmentId}/${loadoutId}`
							] = null)
					)
				)
				// Nuke!
				.then(() => database.ref()
					.update(deleteReferences))
		)
	},

	weapon: (weaponId) => ({
		attachments: loadoutWeaponAttachments(loadoutId, weaponId)
	})
})
