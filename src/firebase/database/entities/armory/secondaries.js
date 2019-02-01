import useAbstract from '../_abstract'
import auth from '../../../auth'
import { database } from '../..'

export default () => {
	let abstract = useAbstract(database)
	return {
		...abstract.useCrud('armory/secondaries'),

		delete: (id) => {
			let deletionRefs = {
				// Armory item
				[`${auth.user.uid}/armory/secondaries/${id}`]: null,

				// Lookup table entry
				[`${auth.user.uid}/lookups/loadouts/weapons/secondaries/${id}`]: null
			}

			// Get all uses of this item in any loadouts
			return (
				database
					.ref(`${auth.user.uid}/lookups/loadouts/weapons/secondaries/${id}`)
					.once('value')
					.then((snap) => {
						Object.keys(snap.val() || {})
							.forEach(
								(key) => (deletionRefs[`${auth.user.uid}/loadouts/${key}/secondaries/${id}`] = null)
							)
					})
					// Nuke!
					.then(() => database.ref()
						.update(deletionRefs))
			)
		}
	}
}
