import client from '.'
import config from '../config'
import auth from './auth'

let database = client.database(config.firebase.databaseURL)

let primaries = {
	get: () => {
		return new Promise((resolve, reject) => {
			database
				.ref(`primaries/${auth.user.uid}`)
				.on('value', (snap) => resolve(snap.val() ? Object.values(snap.val()) : []), reject)
		})
	},
	getById: (id) => {
		return new Promise((resolve, reject) => {
			database.ref(`primaries/${auth.user.uid}/${id}`)
				.on('value', (snap) => resolve(snap.val()), reject)
		})
	},
	add: (props) => {
		return database.ref(`/primaries/${auth.user.uid}`)
			.push(props)
	}
}

export default { primaries }
