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
			.push(props)
	}
}

let primaries = useCrud('armory', 'primaries')
let secondaries = useCrud('armory', 'secondaries')
let attachments = useCrud('armory', 'attachments')
let gear = useCrud('armory', 'gear')

let loadouts = {
	...useCrud('loadouts', ''),
	getById: (id) => {
		return (
			database
				.ref(`loadouts/${auth.user.uid}/${id}`)
				.once('value')
		)
	},
	addPrimary: (loadoutId, primaryId) => {
		return primaries.getById(primaryId)
			.then(snap => database
				.ref(`loadouts/${auth.user.uid}/${loadoutId}/primaries`)
				.update({ [snap.key]: snap.val() }))
	},
	addSecondary: (loadoutId, secondaryId) => {
		return secondaries.getById(secondaryId)
			.then(snap => database
				.ref(`loadouts/${auth.user.uid}/${loadoutId}/secondaries`)
				.update({ [snap.key]: snap.val() }))
	},
	addAttachmentToPrimary: (loadoutId, primaryId, attachmentId) => {
		return attachments.getById(attachmentId)
			.then((snap) => database
				.ref(`loadouts/${auth.user.uid}/${loadoutId}/primaries/${primaryId}/attachments`)
				.update({ [snap.key]: snap.val() }))
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
