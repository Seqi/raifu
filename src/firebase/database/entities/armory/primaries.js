import useAbstract from '../_abstract'
import { database } from '../..'
import auth from '../../../auth'

export default () => {
	let abstract = useAbstract(database)
	return {
		...abstract.useCrud('armory/primaries'),

		delete: (id) => {
			let deletionRefs = {
				// Armory item
				[`${auth.user.uid}/armory/primaries/${id}`]: null,

				// Lookup table entry
				[`${auth.user.uid}/lookups/loadouts/weapons/primaries/${id}`]: null
			}

			// Get all uses of this item in any loadouts
			return (
				database
					.ref(`${auth.user.uid}/lookups/loadouts/weapons/primaries/${id}`)
					.once('value')
					.then((snap) => {
						Object.keys(snap.val() || {})
							.forEach(
								(key) => (deletionRefs[`${auth.user.uid}/loadouts/${key}/primaries/${id}`] = null)
							)
					})
					// Nuke!
					.then(() => database.ref()
						.update(deletionRefs))
			)
		}
	}
}
