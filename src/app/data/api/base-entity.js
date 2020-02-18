import { CloudFunction } from '../../functions'

export default (entityName, Entity) => {
	return {
		get: () =>
			new CloudFunction()
				.path(entityName)
				.get()
				.then((result) => result.map(Entity)),
		getById: (id) =>
			new CloudFunction()
				.path(`${entityName}/${id}`)
				.get()
				.then(Entity),
		add: (props) =>
			new CloudFunction()
				.path(entityName)
				.post(props)
				.then(Entity),
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