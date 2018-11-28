import client from '.'
import config from '../config'
import auth from './auth'

let database = client.database(config.firebase.databaseURL)

function useGet(route) {
	return new Promise((resolve, reject) => {
		database.ref(route)
			.once('value', resolve, reject)
	})
}

function useCrud(route, userRoute) {
	return {
		get: () => useGet(`${route}/${auth.user.uid}/${userRoute}`),
		getById: (id) => {
			return new Promise((resolve, reject) => {
				database
					.ref(`${route}/${auth.user.uid}/${userRoute}/${id}`)
					.once('value', (snap) => resolve(snap.val()), reject)
			})
		},
		add: (props) => {
			return database.ref(`${route}/${auth.user.uid}/${userRoute}`)
				.push(props)
		}
	}
}

export default {
	primaries: useCrud('armory', 'primaries'),
	secondaries: useCrud('armory', 'secondaries'),
	attachments: useCrud('armory', 'attachments'),
	gear: useCrud('armory', 'gear'),
	loadouts: useCrud('loadouts', ''),
	brands: {
		get: () => useGet('brands')
	},
	platforms: {
		getTypes: () =>
			new Promise((resolve, reject) => {
				database
					.ref('platforms')
					.once('value', resolve, reject)
			}),
		get: (platform) => useGet(`platforms/${platform}`)
	}
}
