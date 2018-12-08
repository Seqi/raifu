import auth from '../../auth'

export default (database) => ({
	useCrud: (route, userRoute) => {
		return {
			get: () => database.ref(`${route}/${auth.user.uid}/${userRoute}`)
				.once('value'),
			getById: (id) => database.ref(`${route}/${auth.user.uid}/${userRoute}/${id}`)
				.once('value'),
			add: (props) => database.ref(`${route}/${auth.user.uid}/${userRoute}`)
				.push(props)
		}
	}
})
