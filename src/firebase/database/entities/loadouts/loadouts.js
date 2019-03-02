import { database, paths } from '../..'

import weapons from '../armory/weapons'
import attachments from '../armory/attachments'

export default () => {
	return {
		get: () => database.ref(paths().loadouts)
			.once('value'),
		getById: (id) => database.ref(`${paths().loadouts}/${id}`)
			.once('value'),
		add: (props) => database.ref(paths().loadouts)
			.push(props),

		// TODO: Move into loadout obj below
		delete: (loadoutId) => {
			// Remove loadout itself
			let deleteReferences = {
				[`${paths().loadouts}/${loadoutId}`]: null
			}

			// Remove all lookup item references to this loadout
			return (
				database
					.ref(`${paths().loadouts}/${loadoutId}`)
					.once('value')
					.then((snap) => {
						let val = snap.val()

						// Remove all weapon/loadout lookups for all weapons attached to this loadout
						Object.keys(val.weapons || {})
							.forEach((weaponId) => {
								deleteReferences[`${paths().lookups.loadouts.weapons}/${weaponId}/${loadoutId}`] = null

								// Remove attachment lookups
								let weapon = val[weaponId]

								// Remove all attachment/loadout lookups for all attachments on this weapon
								Object.keys(weapon.attachments || {})
									.forEach((attachmentId) => {
										deleteReferences[
											`${paths().lookups.loadouts.attachments}/${attachmentId}/${loadoutId}`
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
							updatePaths[`${paths().loadout}/${loadoutId}/${key}`] = loadout[key]
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
									.ref(`${paths().lookups.loadouts.weapons}/${weaponId}`)
									.update({ [loadoutId]: true })

								return snap
							})
							// Add the weapon object to the loadout itself
							.then((snap) =>
								database.ref(`${paths()
									.loadout(loadoutId).weapons}`)
									.update({ [snap.key]: snap.val() })
							),

					delete: () => {
						let deleteReferences = {
							// Remove weapon itself
							[`${paths()
								.loadout(loadoutId).weapons}/${weaponId}`]: null,

							// Remove lookup
							[`${paths().lookups.loadouts.weapons}/${weaponId}/${loadoutId}`]: null
						}

						return (
							// Load the attachments attached to this weapon
							database
								.ref(
									paths()
										.loadout(loadoutId)
										.weapon(weaponId).attachments
								)
								.once('value')
								.then((snap) => Object.keys(snap.val() || {}))

								// Remove all lookups to attachments on this loadout
								.then((attachmentIds) =>
									attachmentIds.forEach(
										(attachmentId) =>
											(deleteReferences[
												`${paths().lookups.loadouts.attachments}/${attachmentId}/${loadoutId}`
											] = null)
									)
								)
								// Nuke!
								.then(() => database.ref()
									.update(deleteReferences))
						)
					},

					addAttachment: (attachmentId) => {
						return (
							attachments()
								.getById(attachmentId)
								// Add a lookup between the loadout and attachment
								.then((snap) => {
									database
										.ref(`${paths().lookups.loadouts.attachments}/${attachmentId}`)
										.update({ [loadoutId]: { weaponId: weaponId } })

									return snap
								})
								// Add the attachment to the weapon
								.then((snap) =>
									database
										.ref(
											paths()
												.loadout(loadoutId)
												.weapon(weaponId).attachments
										)
										.update({ [snap.key]: snap.val() })
								)
						)
					},

					removeAttachment: (attachmentId) => {
						return (
							database
								// Remove the lookup between this loadout and the attachment
								.ref(`${paths().lookups.loadouts.attachments}/${attachmentId}`)
								.update({ [loadoutId]: null })
								// Remove the attachment from the weapon
								.then(() =>
									database
										.ref(
											paths()
												.loadout(loadoutId)
												.weapon(weaponId).attachments
										)
										.update({ [attachmentId]: null })
								)
						)
					}
				})
			}
		}
	}
}
