import app from '../../'
import { toEntity } from './entity.model'

export default (entityName) => {
	return {
		get: () =>
			app
				.functions()
				.httpsCallable(`${entityName}-getAll`)()
				.then((result) => result.data.map(toEntity)),
		getById: (id) =>
			app
				.functions()
				.httpsCallable(`${entityName}-getById`)(id)
				.then((result) => toEntity(result.data)),
		add: (props) =>
			app
				.functions()
				.httpsCallable(`${entityName}-add`)({...props, id: 'b' })
				.then((result) => toEntity(result.data)),
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
