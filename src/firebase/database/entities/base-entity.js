import { toEntity } from './entity.model'
import { CloudFunction } from '../../functions'

export default (entityName) => {
	return {
		get: () =>
			new CloudFunction()
				.path(entityName)
				.get()
				.then((result) => result.map(toEntity)),
		getById: (id) =>
			new CloudFunction()
				.path(`${entityName}/${id}`)
				.get()
				.then(toEntity),
		add: (props) =>
			new CloudFunction()
				.path(entityName)
				.post(props)
				.then(toEntity),
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