import useAbstract from '../_abstract'
import { database } from '../..'
import auth from '../../../auth'

import weapons from '../armory/weapons'
import attachments from '../armory/attachments'

export default () => {
	let abstract = useAbstract(database)
	return {
		...abstract.useCrud('loadouts'),

		// TODO: Move into loadout obj below
		delete: (id) => {
			// Remove loadout itself
			let deleteReferences = {
				[`${auth.user.uid}/loadouts/${id}`]: null
			}

			// Remove all lookup item references to this loadout
			return (
				database
					.ref(`${auth.user.uid}/loadouts/${id}`)
					.once('value')
					.then((snap) => {
						let val = snap.val()

						// Remove all weapon/loadout lookups for all weapons attached to this loadout
						Object.keys(val.weapons || {})
							.forEach((weaponId) => {
								deleteReferences[`${auth.user.uid}/lookups/loadouts/weapons/${weaponId}/${id}`] = null

								// Remove attachment lookups
								let weapon = val[weaponId]

								// Remove all attachment/loadout lookups for all attachments on this weapon
								Object.keys(weapon.attachments || {})
									.forEach((attachmentId) => {
										deleteReferences[
											`${auth.user.uid}/lookups/loadouts/attachments/${attachmentId}/${id}`
										] = null
									})
							})
					})
					// Nuke!
					.then(() => database.ref()
						.update(deleteReferences))
			)
		},

		loadout: (loadoutId) => {
			return {
				update(loadout) {
					let updatePaths = {}

					Object.keys(loadout)
						.forEach((key) => {
							updatePaths[`${auth.user.uid}/loadouts/${loadoutId}/${key}`] = loadout[key]
						})

					return database.ref()
						.update(updatePaths)
				},

				weapons: (weaponId) => ({
					add: () =>
						weapons()
							.getById(weaponId)
							// Add a lookup between this loadout and the new weapon
							.then((snap) => {
								database
									.ref(`${auth.user.uid}/lookups/loadouts/weapons/${weaponId}`)
									.update({ [loadoutId]: true })

								return snap
							})
							// Add the weapon object to the loadout itself
							.then((snap) =>
								database
									.ref(`${auth.user.uid}/loadouts/${loadoutId}/weapons`)
									.update({ [snap.key]: snap.val() })
							),

					delete: () => {
						let deleteReferences = {
							// Remove weapon itself
							[`${auth.user.uid}/loadouts/${loadoutId}/weapons/${weaponId}`]: null,

							// Remove lookup
							[`${auth.user.uid}/lookups/loadouts/weapons/${weaponId}/${loadoutId}`]: null
						}

						return (
							// Load the attachments attached to this weapon
							database
								.ref(`${auth.user.uid}/loadouts/${loadoutId}/weapons/${weaponId}/attachments`)
								.once('value')
								.then((snap) => Object.keys(snap.val() || {}))

								// Remove all lookups to attachments on this loadout
								.then((attachmentIds) =>
									attachmentIds.forEach(
										(attachmentId) =>
											(deleteReferences[
												`${
													auth.user.uid
												}/lookups/loadouts/attachments/${attachmentId}/${loadoutId}`
											] = null)
									)
								)
								// Nuke!
								.then(() => database.ref()
									.update(deleteReferences))
						)
					},

					addAttachment: (attachmentId) => {
						return attachments()
							.getById(attachmentId)
							.then((snap) => {
								database
									.ref(`${auth.user.uid}/lookups/loadouts/attachments/${attachmentId}`)
									.update({ [loadoutId]: { weaponId: weaponId } })

								return snap
							})
							.then((snap) =>
								database
									.ref(`${auth.user.uid}/loadouts/${loadoutId}/weapons/${weaponId}/attachments`)
									.update({ [snap.key]: snap.val() })
							)
					},

					removeAttachment: (attachmentId) => {
						return database
							.ref(`${auth.user.uid}/lookups/loadouts/attachments/${attachmentId}`)
							.update({ [loadoutId]: null })
							.then(() =>
								database
									.ref(`${auth.user.uid}/loadouts/${loadoutId}/weapons/${weaponId}/attachments`)
									.update({ [attachmentId]: null })
							)
					}
				})
			}
		}
	}
}
