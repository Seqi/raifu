import { database, paths } from '../..'

import loadoutWeapons from './loadout-weapons'

export default () => {
	return {
		get: () => database.ref(paths().loadouts)
			.once('value'),
		getById: (id) => database.ref(`${paths().loadouts}/${id}`)
			.once('value'),
		add: (props) => database.ref(paths().loadouts)
			.push(props),
		update(loadoutId, loadout) {
			let updatePaths = {}

			Object.keys(loadout)
				.forEach((key) => {
					updatePaths[`${paths().loadouts}/${loadoutId}/${key}`] = loadout[key]
				})

			return database.ref()
				.update(updatePaths)
		},
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

		loadout: (loadoutId) => ({
			weapons: loadoutWeapons(loadoutId)
		})
	}
}
