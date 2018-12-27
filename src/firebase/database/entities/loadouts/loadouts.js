import useAbstract from '../_abstract'
import { database } from '../..'
import auth from '../../../auth'

import primaries from '../armory/primaries'
import secondaries from '../armory/secondaries'
import attachments from '../armory/attachments'

export default () => {
	let abstract = useAbstract(database)
	return {
		...abstract.useCrud('loadouts', ''),

		// TODO: Move into loadout obj below
		delete: (id) => {
			let deleteReferences = {
				// Remove loadout itself
				[`loadouts/${auth.user.uid}/${id}`]: null
			}

			// Remove all lookup item references to this loadout
			return (
				database
					.ref(`loadouts/${auth.user.uid}/${id}`)
					.once('value')
					.then((snap) => {
						let val = snap.val()

						let removeLookups = (slot) => {
							if (val[slot]) {
								Object.keys(val[slot])
									.forEach((key) => {
									// Remove weapon lookups
										deleteReferences[
											`lookups/${auth.user.uid}/loadouts/weapons/${slot}/${key}/${id}`
										] = null

										// Remove attachment lookups
										let weapon = val[slot][key]

										Object.keys(weapon.attachments || {})
											.forEach((attachmentId) => {
												deleteReferences[
													`lookups/${auth.user.uid}/loadouts/attachments/${attachmentId}/${id}`
												] = null
											})
									})
							}
						}

						removeLookups('primaries')
						removeLookups('secondaries')
					})
					// Nuke!
					.then(() => database.ref()
						.update(deleteReferences))
			)
		},

		loadout: (loadoutId) => {
			return {
				update(obj) {
					let updatePaths = {}

					Object.keys(obj)
						.forEach((key) => {
							updatePaths[`loadouts/${auth.user.uid}/${loadoutId}/${key}`] = obj[key]
						})

					return database.ref()
						.update(updatePaths)
				},

				primaries: (primaryId) => ({
					add: () =>
						primaries()
							.getById(primaryId)
							.then((snap) => {
								database
									.ref(`lookups/${auth.user.uid}/loadouts/weapons/primaries/${primaryId}`)
									.update({ [loadoutId]: true })

								return snap
							})
							.then((snap) =>
								database
									.ref(`loadouts/${auth.user.uid}/${loadoutId}/primaries`)
									.update({ [snap.key]: snap.val() })
							),

					delete: () => {
						let deleteReferences = {
							// Remove weapon itself
							[`loadouts/${auth.user.uid}/${loadoutId}/primaries/${primaryId}`]: null,

							// Remove lookup
							[`lookups/${auth.user.uid}/loadouts/weapons/primaries/${primaryId}/${loadoutId}`]: null
						}

						// Load the attachments attached to this weapon
						return (
							database
								.ref(`loadouts/${auth.user.uid}/${loadoutId}/primaries/${primaryId}/attachments`)
								.once('value')
								.then((snap) => Object.keys(snap.val() || {}))

								// Remove all references of this attachment being used in this loadout
								.then((attachmentIds) =>
									attachmentIds.forEach(
										(attachmentId) =>
											(deleteReferences[
												`lookups/${
													auth.user.uid
												}/loadouts/attachments/${attachmentId}/${loadoutId}`
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
									.ref(`lookups/${auth.user.uid}/loadouts/attachments/${attachmentId}`)
									.update({ [loadoutId]: { slot: 'primaries', weaponId: primaryId } })

								return snap
							})
							.then((snap) =>
								database
									.ref(`loadouts/${auth.user.uid}/${loadoutId}/primaries/${primaryId}/attachments`)
									.update({ [snap.key]: snap.val() })
							)
					},

					removeAttachment: (attachmentId) => {
						return database
							.ref(`lookups/${auth.user.uid}/loadouts/attachments/${attachmentId}`)
							.update({ [loadoutId]: null })
							.then(() =>
								database
									.ref(`loadouts/${auth.user.uid}/${loadoutId}/primaries/${primaryId}/attachments`)
									.update({ [attachmentId]: null })
							)
					}
				}),

				secondaries: (secondaryId) => ({
					add: () =>
						secondaries()
							.getById(secondaryId)
							.then((snap) => {
								database
									.ref(`lookups/${auth.user.uid}/loadouts/weapons/secondaries/${secondaryId}`)
									.update({ [loadoutId]: true })

								return snap
							})
							.then((snap) =>
								database
									.ref(`loadouts/${auth.user.uid}/${loadoutId}/secondaries`)
									.update({ [snap.key]: snap.val() })
							),

					delete: () => {
						let deleteReferences = {
							// Remove weapon itself
							[`loadouts/${auth.user.uid}/${loadoutId}/secondaries/${secondaryId}`]: null,

							// Remove lookup
							[`lookups/${auth.user.uid}/loadouts/weapons/secondaries/${secondaryId}/${loadoutId}`]: null
						}

						// Load the attachments attached to this weapon
						return (
							database
								.ref(`loadouts/${auth.user.uid}/${loadoutId}/secondaries/${secondaryId}/attachments`)
								.once('value')
								.then((snap) => Object.keys(snap.val() || {}))

								// Remove all references of this attachment being used in this loadout
								.then((attachmentIds) =>
									attachmentIds.forEach(
										(attachmentId) =>
											(deleteReferences[
												`lookups/${
													auth.user.uid
												}/loadouts/attachments/${attachmentId}/${loadoutId}`
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
									.ref(`lookups/${auth.user.uid}/loadouts/attachments/${attachmentId}`)
									.update({ [loadoutId]: { slot: 'secondaries', weaponId: secondaryId } })

								return snap
							})
							.then((snap) =>
								database
									.ref(
										`loadouts/${auth.user.uid}/${loadoutId}/secondaries/${secondaryId}/attachments`
									)
									.update({ [snap.key]: snap.val() })
							)
					},

					removeAttachment: (attachmentId) => {
						return database
							.ref(`lookups/${auth.user.uid}/loadouts/attachments/${attachmentId}`)
							.update({ [loadoutId]: null })
							.then(() =>
								database
									.ref(
										`loadouts/${auth.user.uid}/${loadoutId}/secondaries/${secondaryId}/attachments`
									)
									.update({ [attachmentId]: null })
							)
					}
				})
			}
		}
	}
}
