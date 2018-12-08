import useAbstract from '../_abstract'
import auth from '../../../auth'
import { database } from '../..'

export default () => {
	let abstract = useAbstract(database)
	return {
		...abstract.useCrud('armory', 'primaries'),

		delete: (id) => {
			let deletionRefs = {
				// Armory item
				[`armory/${auth.user.uid}/primaries/${id}`]: null,

				// Lookup table entry
				[`loadouts/${auth.user.uid}/weaponLookup/primaries/${id}`]: null
			}

			// Get all uses of this item in any loadouts
			return (
				database
					.ref(`loadouts/${auth.user.uid}/weaponLookup/primaries/${id}`)
					.once('value')
					.then((snap) =>
						Object.keys(snap.val() || {})
							.forEach(
								(key) => (deletionRefs[`loadouts/${auth.user.uid}/loadouts/${key}/primaries/${id}`] = null)
							)
					)
					// Nuke!
					.then(() => database.ref()
						.update(deletionRefs))
			)
		}
	}
}
