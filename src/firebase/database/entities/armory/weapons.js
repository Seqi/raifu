import useAbstract from '../_abstract'
import { database } from '../..'
import auth from '../../../auth'

export default () => {
	let abstract = useAbstract(database)
	return {
		...abstract.useCrud('armory/weapons'),

		delete: (weaponId) => {
			let deletionRefs = {
				// Armory item
				[`${auth.user.uid}/armory/weapons/${weaponId}`]: null,

				// Lookup table entry
				[`${auth.user.uid}/lookups/loadouts/weapons/${weaponId}`]: null
			}

			// Get all uses of this item in any loadouts
			return (
				database
					.ref(`${auth.user.uid}/lookups/loadouts/weapons/${weaponId}`)
					.once('value')
					.then((snap) => {
						Object.keys(snap.val() || {})
							.forEach(
								(loadoutId) =>
									(deletionRefs[`${auth.user.uid}/loadouts/${loadoutId}/weapons/${weaponId}`] = null)
							)
					})
					// Nuke!
					.then(() => database.ref()
						.update(deletionRefs))
			)
		}
	}
}
