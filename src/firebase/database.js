import client from '.'
import config from '../config'
import auth from './auth'

let database = client.database(config.firebase.databaseURL)

function useCrud(route) {
	return {
		get: () => {
			return new Promise((resolve, reject) => {
				database
					.ref(`${route}/${auth.user.uid}`)
					.once('value', (snap) => resolve(snap.val() ? Object.values(snap.val()) : []), reject)
			})
		},
		getById: (id) => {
			return new Promise((resolve, reject) => {
				database.ref(`${route}/${auth.user.uid}/${id}`)
					.once('value', (snap) => resolve(snap.val()), reject)
			})
		},
		add: (props) => {
			return database.ref(`${route}/${auth.user.uid}`)
				.push(props)
		}
	}
}

export default {
	primaries: useCrud('primaries'),
	secondaries: useCrud('secondaries'),
	attachments: useCrud('attachments'),
	gear: useCrud('gear'),
	brands: {
		get: () => {
			return new Promise((resolve, reject) => {
				database
					.ref('brands')
					.once('value', (snap) => resolve(snap.val() ? Object.values(snap.val()) : []), reject)
			})
		}
	}
}
