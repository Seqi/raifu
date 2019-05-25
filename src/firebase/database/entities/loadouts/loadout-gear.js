import app from '../../../'
import { toEntity } from '../entity.model'
import errorCheck from '../../utils/error-check'

export default (loadoutId) => ({
	add: (gearId) =>
		app
			.functions()
			.httpsCallable('loadouts-gear-add')({ gearId, loadoutId })
			.then(errorCheck)
			.then((result) => toEntity(result.data)),
	delete: (gearId) =>
		app
			.functions()
			.httpsCallable('loadouts-gear-delete')({ gearId, loadoutId })
			.then(errorCheck)
			.then((result) => result.data),
})
