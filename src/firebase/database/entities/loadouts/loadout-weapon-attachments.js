import { database, paths } from '../../'

import attachments from '../armory/attachments'

export default (loadoutId, weaponId) => ({
	add: (attachmentId) => {
		return (
			attachments()
				.getById(attachmentId)
				// Add a lookup between the loadout and attachment
				.then((snap) => {
					database
						.ref(`${paths().lookups.loadouts.attachments}/${attachmentId}`)
						.update({ [loadoutId]: { weaponId: weaponId } })

					return snap
				})
				// Add the attachment to the weapon
				.then((snap) =>
					database
						.ref(
							paths()
								.loadout(loadoutId)
								.weapon(weaponId).attachments
						)
						.update({ [snap.key]: snap.val() })
				)
		)
	},

	delete: (attachmentId) => {
		return (
			database
				// Remove the lookup between this loadout and the attachment
				.ref(`${paths().lookups.loadouts.attachments}/${attachmentId}`)
				.update({ [loadoutId]: null })
				// Remove the attachment from the weapon
				.then(() =>
					database
						.ref(
							paths()
								.loadout(loadoutId)
								.weapon(weaponId).attachments
						)
						.update({ [attachmentId]: null })
				)
		)
	}
})
