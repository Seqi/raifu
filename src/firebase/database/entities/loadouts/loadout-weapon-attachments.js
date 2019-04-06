import app from '../../../'

export default (loadoutId, weaponId) => ({
	add: (attachmentId) =>
		app
			.functions()
			.httpsCallable('loadouts-weapons-attachments-add')({
				weaponId,
				attachmentId,
				loadoutId
			})
			.then((response) => response.data),

	delete: (attachmentId) =>
		app
			.functions()
			.httpsCallable('loadouts-weapons-attachments-delete')({
				weaponId,
				attachmentId,
				loadoutId
			})
			.then((response) => response.data)
})
