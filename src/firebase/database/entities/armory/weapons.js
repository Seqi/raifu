import useAbstract from '../_abstract'
import { database } from '../..'
import auth from '../../../auth'

export default () => {
	let abstract = useAbstract(database)
	return {
		...abstract.useCrud('armory/weapons'),

		delete: (id) => {
			let deletionRefs = {
				// Armory item
				[`${auth.user.uid}/armory/weapons/${id}`]: null,

				// Lookup table entry
				[`${auth.user.uid}/lookups/loadouts/weapons/${id}`]: null
			}

			// Get all uses of this item in any loadouts
			return (
				database
					.ref(`${auth.user.uid}/lookups/loadouts/weapons/${id}`)
					.once('value')
					.then((snap) => {
						Object.keys(snap.val() || {})
							.forEach(
								(key) => (deletionRefs[`${auth.user.uid}/loadouts/${key}/${id}`] = null)
							)
					})
					// Nuke!
					.then(() => database.ref()
						.update(deletionRefs))
			)
		}
	}
}
