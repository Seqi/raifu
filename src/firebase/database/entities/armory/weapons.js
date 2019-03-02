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
					// Remove the weapon from the loadout
					.then((snap) => {
						Object.keys(snap.val() || {})
							.forEach((loadoutId) => {
								let path = `${paths()
									.loadout(loadoutId).weapons}/${weaponId}`

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
