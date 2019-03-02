import { database, paths } from '../..'

export default () => {
	return {
		get: () => database.ref(paths().armory.weapons)
			.once('value'),
		getById: (id) => database.ref(`${paths().armory.weapons}/${id}`)
			.once('value'),
		add: (props) => database.ref(paths().armory.weapons)
			.push(props),
		delete: (weaponId) => {
			let deletionRefs = {
				// Armory item
				[`${paths().armory.weapons}/${weaponId}`]: null,

				// Lookup table entry
				[`${paths().lookups.loadouts.weapons}/${weaponId}`]: null
			}

			return (
				database
					// Get all uses of this item in any loadouts
					.ref(`${paths().lookups.loadouts.weapons}/${weaponId}`)
					.once('value')
					.then((snap) => {
						let loadoutIds = Object.keys(snap.val() || {})

						// Remove the weapon from the loadout
						loadoutIds.forEach((loadoutId) => {
							let path = `${paths()
								.loadout(loadoutId).weapons}/${weaponId}`

							deletionRefs[path] = null
						})

						// Check any attachments on the weapon on the loadout and remove lookup
						return loadoutIds.map((loadoutId) => {
							let attachmentsOnWeaponPath = paths()
								.loadout(loadoutId)
								.weapon(weaponId).attachments

							return database
								.ref(attachmentsOnWeaponPath)
								.once('value')
								.then((snap) => {
									let attachmentIds = Object.keys(snap.val() || {})
									attachmentIds.forEach((attachmentId) => {
										let path = `${
											paths().lookups.loadouts.attachments
										}/${attachmentId}/${loadoutId}`
										deletionRefs[path] = null
									})
								})
						})
					})
					// Execute the attachment lookup deletions
					.then((attachmentLookupPromises) => Promise.all(attachmentLookupPromises))
					// Nuke!
					.then(() => database.ref()
						.update(deletionRefs))
			)
		}
	}
}
