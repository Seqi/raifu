import useAbstract from '../_abstract'
import { database } from '../..'
import auth from '../../../auth'

export default () => {
	let abstract = useAbstract(database)
	return {
		...abstract.useCrud('armory/attachments'),

		delete: (attachmentId) => {
			let deletionRefs = {
				// Armory item
				[`${auth.user.uid}/armory/attachments/${attachmentId}`]: null,

				// Lookup table entry
				[`${auth.user.uid}/lookups/loadouts/attachments/${attachmentId}`]: null
			}

			// Get all uses of this item in any loadouts
			return (
				database
					.ref(`${auth.user.uid}/lookups/loadouts/attachments/${attachmentId}`)
					.once('value')
					.then((snap) => {
						let loadouts = snap.val()

						Object.keys(loadouts || {})
							.forEach((loadoutId) => {
								let lookup = loadouts[loadoutId]
								let weaponId = lookup.weaponId

								deletionRefs[
									`${auth.user.uid}/loadouts/${loadoutId}/weapons/${weaponId}/attachments/${attachmentId}`
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
