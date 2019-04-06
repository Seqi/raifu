import app from '../../'

export default (entityName) => {
	return {
		get: () =>
			app
				.functions()
				.httpsCallable(`${entityName}-getAll`)()
				.then((result) => result.data),
		getById: (id) =>
			app
				.functions()
				.httpsCallable(`${entityName}-getById`)(id)
				.then((result) => result.data),
		add: (props) =>
			app
				.functions()
				.httpsCallable(`${entityName}-add`)(props)
				.then((result) => result.data),
		edit: (props) =>
			app
				.functions()
				.httpsCallable(`${entityName}-edit`)(props)
				.then((result) => result.data),
		delete: (id) =>
			app
				.functions()
				.httpsCallable(`${entityName}-delete`)(id)
				.then((result) => result.data)
	}
}
