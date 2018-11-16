import client from '.'
import config from '../config'
import auth from './auth'

let database = client.database(config.firebase.databaseURL)

let primaries = {
	get: () => {
		return new Promise((resolve, reject) => {
			database.ref('primaries')
				.on('value', (snap) => resolve(Object.values(snap.val())), reject)
		})
	},
	add: (props) => {
		return database.ref(`/primaries/${auth.user.uid}`)
			.push(props)
	}
}

export default { primaries }
