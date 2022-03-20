import { toEntity } from '../models/entity.model'
import CloudFunction from './cloud-function'

export default function baseEntity(entityName: string, EntityModel?: any) {
	return {
		get: () =>
			new CloudFunction()
				.path(entityName)
				.get()
				.then((result) =>
					result.map((r: any) => (EntityModel ? new EntityModel(r) : toEntity(r)))
				),
		getById: (id: string) =>
			new CloudFunction()
				.path(`${entityName}/${id}`)
				.get()
				.then((r) => (EntityModel ? new EntityModel(r) : toEntity(r))),
		add: (props: any) =>
			new CloudFunction()
				.path(entityName)
				.post(props)
				.then((r) => (EntityModel ? new EntityModel(r) : toEntity(r))),
		edit: (id: string, props: any) =>
			new CloudFunction().path(`${entityName}/${id}`).put(props),
		delete: (id: string) => new CloudFunction().path(`${entityName}/${id}`).delete(),
	}
}
