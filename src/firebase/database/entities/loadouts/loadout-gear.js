import app from '../../../'
import { toEntity } from '../entity.model'

export default (loadoutId) => ({
	add: (gearId) =>
		app
			.functions()
			.httpsCallable('loadouts-gear-add')({ gearId, loadoutId })
			.then((result) => toEntity(result.data)),
	delete: (gearId) =>
		app
			.functions()
			.httpsCallable('loadouts-gear-delete')({ gearId, loadoutId })
			.then((result) => result.data),
})
