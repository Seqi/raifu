import app from '../../../'
import { toEntity } from '../entity.model'
import errorCheck from '../../utils/error-check'

export default (loadoutId, weaponId) => ({
	add: (attachmentId) =>
		app
			.functions()
			.httpsCallable('loadouts-weapons-attachments-add')({
				weaponId,
				attachmentId,
				loadoutId
			})
			.then(errorCheck)
			.then((result) => toEntity(result.data)),

	delete: (attachmentId) =>
		app
			.functions()
			.httpsCallable('loadouts-weapons-attachments-delete')({
				weaponId,
				attachmentId,
				loadoutId
			})
			.then(errorCheck)
			.then((result) => result.data)
})
