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

export default {
	primaries: useCrud('armory', 'primaries'),
	secondaries: useCrud('armory', 'secondaries'),
	attachments: useCrud('armory', 'attachments'),
	gear: useCrud('armory', 'gear'),
	loadouts: {
		...useCrud('loadouts', ''),
		addPrimary: (loadoutId, primaryId) => {
			database.ref(`loadouts/${auth.user.uid}/${loadoutId}/primaries`)
				.update({ [primaryId]: true })
		},
		addSecondary: (loadoutId, primaryId) => {
			database.ref(`loadouts/${auth.user.uid}/${loadoutId}/secondaries`)
				.update({ [primaryId]: true })
		}
	},
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
