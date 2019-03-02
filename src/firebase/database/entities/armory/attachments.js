import { database, paths } from '../..'

export default () => {
	return {
		get: () => database.ref(paths().armory.attachments)
			.once('value'),
		getById: (id) => database.ref(`${paths().armory.attachments}/${id}`)
			.once('value'),
		add: (props) => database.ref(paths().armory.attachments)
			.push(props),

		delete: (attachmentId) => {
			let deletionRefs = {
				// Armory item
				[`${paths().armory.attachments}/${attachmentId}`]: null,

				// Lookup table entry
				[`${paths().lookups.loadouts.attachments}/${attachmentId}`]: null
			}

			// Get all uses of this item in any loadouts
			return (
				database
					.ref(`${paths().lookups.loadouts.attachments}/${attachmentId}`)
					.once('value')
					.then((snap) => {
						let loadouts = snap.val()

						Object.keys(loadouts || {})
							.forEach((loadoutId) => {
								let lookup = loadouts[loadoutId]
								let weaponId = lookup.weaponId

								let path = paths()
									.loadout(loadoutId)
									.weapon(weaponId)
									.attachment(attachmentId)

								deletionRefs[path] = null
							})
					})
					// Nuke!
					.then(() => database.ref()
						.update(deletionRefs))
			)
		}
	}
}
