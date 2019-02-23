import useAbstract from '../_abstract'
import { database } from '../..'
import auth from '../../../auth'

export default () => {
	let abstract = useAbstract(database)
	return {
		...abstract.useCrud('armory/attachments'),

		delete: (id) => {
			let deletionRefs = {
				// Armory item
				[`${auth.user.uid}/armory/attachments/${id}`]: null,

				// Lookup table entry
				[`${auth.user.uid}/lookups/loadouts/attachments/${id}`]: null
			}

			// Get all uses of this item in any loadouts
			return (
				database
					.ref(`${auth.user.uid}/lookups/loadouts/attachments/${id}`)
					.once('value')
					.then((snap) => {
						let val = snap.val()

						Object.keys(val || {})
							.forEach((key) => {
							// Key = Loadout Id
							// Val = Slot & Weapon Id
								let lookup = val[key]
								let slot = lookup.slot
								let weaponId = lookup.weaponId

								deletionRefs[
									`${auth.user.uid}/loadouts/${key}/${slot}/${weaponId}/attachments/${id}`
								] = null
							})
					})
					// Nuke!
					.then(() => database.ref()
						.update(deletionRefs))
			)
		}
	}
}
