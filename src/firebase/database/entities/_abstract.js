import auth from '../../auth'

export default (database) => ({
	useCrud: (route) => {
		return {
			get: () => database.ref(`${auth.user.uid}/${route}`)
				.once('value'),
			getById: (id) => database.ref(`${auth.user.uid}/${route}/${id}`)
				.once('value'),
			add: (props) => database.ref(`${auth.user.uid}/${route}`)
				.push(props)
		}
	}
})
