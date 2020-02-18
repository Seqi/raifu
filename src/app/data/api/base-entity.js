import CloudFunction from './cloud-function'

export default (entityName, Entity) => {
	return {
		get: () =>
			new CloudFunction()
				.path(entityName)
				.get()
				.then((result) => result.map(e => new Entity(e))),
		getById: (id) =>
			new CloudFunction()
				.path(`${entityName}/${id}`)
				.get()
				.then(e => new Entity(e)),
		add: (props) =>
			new CloudFunction()
				.path(entityName)
				.post(props)
				.then(e => new Entity(e)),
		edit: (id, props) =>
			new CloudFunction()
				.path(`${entityName}/${id}`)
				.put(props),
		delete: (id) =>
			new CloudFunction()
				.path(`${entityName}/${id}`)
				.delete(),
	}
}