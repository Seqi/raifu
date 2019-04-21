import app from '../../../'
import { toEntity } from '../entity.model'

export default (loadoutId, weaponId) => ({
	add: (attachmentId) =>
		app
			.functions()
			.httpsCallable('loadouts-weapons-attachments-add')({
				weaponId,
				attachmentId,
				loadoutId
			})
			.then((result) => toEntity(result.data)),

	delete: (attachmentId) =>
		app
			.functions()
			.httpsCallable('loadouts-weapons-attachments-delete')({
				weaponId,
				attachmentId,
				loadoutId
			})
			.then((result) => result.data)
})
