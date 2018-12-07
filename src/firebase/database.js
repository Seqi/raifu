import client from '.'
import config from '../config'
import auth from './auth'

let database = client.database(config.firebase.databaseURL)

function useCrud(route, userRoute) {
	return {
		get: () => database.ref(`${route}/${auth.user.uid}/${userRoute}`)
			.once('value'),
		getById: (id) => database.ref(`${route}/${auth.user.uid}/${userRoute}/${id}`)
			.once('value'),
		add: (props) => database.ref(`${route}/${auth.user.uid}/${userRoute}`)
			.push(props),
		delete: (id) => {
			let deletionRefs = {
				// Armory item
				[`${route}/${auth.user.uid}/${userRoute}/${id}`]: null,

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

let primaries = useCrud('armory', 'primaries')
let secondaries = useCrud('armory', 'secondaries')
let attachments = useCrud('armory', 'attachments')
let gear = useCrud('armory', 'gear')

let loadouts = {
	...useCrud('loadouts', 'loadouts'),
	addPrimary: (loadoutId, primaryId) => {
		return primaries
			.getById(primaryId)
			.then((snap) => {
				database
					.ref(`loadouts/${auth.user.uid}/weaponLookup/primaries/${primaryId}`)
					.update({ [loadoutId]: true })

				return snap
			})
			.then((snap) =>
				database
					.ref(`loadouts/${auth.user.uid}/loadouts/${loadoutId}/primaries`)
					.update({ [snap.key]: snap.val() })
			)
	},
	addSecondary: (loadoutId, secondaryId) => {
		return secondaries
			.getById(secondaryId)
			.then((snap) => {
				database
					.ref(`loadouts/${auth.user.uid}/weaponLookup/secondaries/${secondaryId}`)
					.update({ [loadoutId]: true })

				return snap
			})
			.then((snap) =>
				database
					.ref(`loadouts/${auth.user.uid}/loadouts/${loadoutId}/secondaries`)
					.update({ [snap.key]: snap.val() })
			)
	},
	addAttachmentToPrimary: (loadoutId, primaryId, attachmentId) => {
		return attachments
			.getById(attachmentId)
			.then((snap) =>
				database
					.ref(`loadouts/${auth.user.uid}/loadouts/${loadoutId}/primaries/${primaryId}/attachments`)
					.update({ [snap.key]: snap.val() })
			)
	},
	addAttachmentToSecondary: (loadoutId, secondaryId, attachmentId) => {
		return attachments
			.getById(attachmentId)
			.then((snap) =>
				database
					.ref(`loadouts/${auth.user.uid}/loadouts/${loadoutId}/secondaries/${secondaryId}/attachments`)
					.update({ [snap.key]: snap.val() })
			)
	}
}

export default {
	primaries: primaries,
	secondaries: secondaries,
	attachments: attachments,
	gear: gear,
	loadouts: loadouts,
	brands: {
		get: () => database.ref('brands')
			.once('value')
	},
	platforms: {
		getTypes: () => database.ref('platforms')
			.once('value'),
		get: (platform) => database.ref(`platforms/${platform}`)
			.once('value')
	}
}
