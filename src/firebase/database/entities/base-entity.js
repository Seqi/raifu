import app from '../../'
import { toEntity } from './entity.model'
import errorCheck from '../utils/error-check'

export default (entityName) => {
	return {
		get: () =>
			app
				.functions()
				.httpsCallable(`${entityName}-getAll`)()
				.then(errorCheck)
				.then((result) => result.data.map(toEntity)),
		getById: (id) =>
			app
				.functions()
				.httpsCallable(`${entityName}-getById`)(id)
				.then(errorCheck)
				.then((result) => toEntity(result.data)),
		add: (props) =>
			app
				.functions()
				.httpsCallable(`${entityName}-add`)(props)
				.then(errorCheck)
				.then((result) => toEntity(result.data)),
		edit: (props) =>
			app
				.functions()
				.httpsCallable(`${entityName}-edit`)(props)
				.then(errorCheck)
				.then((result) => result.data),
		delete: (id) =>
			app
				.functions()
				.httpsCallable(`${entityName}-delete`)(id)
				.then(errorCheck)
				.then((result) => result.data)
	}
}
