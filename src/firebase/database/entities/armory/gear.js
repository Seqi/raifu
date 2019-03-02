import { database, paths } from '../..'

export default () => {
	return {
		get: () => database.ref(paths().armory.gear)
			.once('value'),
		getById: (id) => database.ref(`${paths().armory.gear}/${id}`)
			.once('value'),
		add: (props) => database.ref(paths().armory.gear)
			.push(props)
	}
}
