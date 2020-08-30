import CloudFunction from './cloud-function'
import { toEntity } from '../models/entity.model'

export default (entityName, EntityModel) => {
	return {
		get: () =>
			new CloudFunction()
				.path(entityName)
				.get()
				.then((result) => result.map((r) => (EntityModel ? new EntityModel(r) : toEntity(r)))),
		getById: (id) =>
			new CloudFunction()
				.path(`${entityName}/${id}`)
				.get()
				.then((r) => (EntityModel ? new EntityModel(r) : toEntity(r))),
		add: (props) =>
			new CloudFunction()
				.path(entityName)
				.post(props)
				.then((r) => (EntityModel ? new EntityModel(r) : toEntity(r))),
		edit: (id, props) => new CloudFunction().path(`${entityName}/${id}`).put(props),
		delete: (id) => new CloudFunction().path(`${entityName}/${id}`).delete(),
	}
}
