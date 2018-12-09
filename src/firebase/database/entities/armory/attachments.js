import useAbstract from '../_abstract'
import { database } from '../..'
import auth from '../../../auth'

export default () => {
	let abstract = useAbstract(database)
	return {
		...abstract.useCrud('armory', 'attachments'),

		delete: (id) => {
			let deletionRefs = {
				// Armory item
				[`armory/${auth.user.uid}/attachments/${id}`]: null,

				// Lookup table entry
				[`loadouts/${auth.user.uid}/attachmentLookup/${id}`]: null
			}

			// Get all uses of this item in any loadouts
			return (
				database
					.ref(`loadouts/${auth.user.uid}/attachmentLookup/${id}`)
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
									`loadouts/${auth.user.uid}/loadouts/${key}/${slot}/${weaponId}/attachments/${id}`
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
