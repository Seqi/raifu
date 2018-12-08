import useAbstract from '../_abstract'
import { database } from '../..'
import auth from '../../../auth'

import primaries from '../armory/primaries'
import secondaries from '../armory/secondaries'
import attachments from '../armory/secondaries'

export default () => {
	let abstract = useAbstract(database)
	return {
		...abstract.useCrud('loadouts', 'loadouts'),
		addPrimary: (loadoutId, primaryId) => {
			return primaries
				.getById(primaryId)
				.then((snap) => {
					database
						.ref(`loadouts/${auth.user.uid}/weaponLookup/primaries/${primaryId}`)
						.update({ [loadoutId]: true })

					return snap
				})
				.then((snap) =>
					database
						.ref(`loadouts/${auth.user.uid}/loadouts/${loadoutId}/primaries`)
						.update({ [snap.key]: snap.val() })
				)
		},
		addSecondary: (loadoutId, secondaryId) => {
			return secondaries
				.getById(secondaryId)
				.then((snap) => {
					database
						.ref(`loadouts/${auth.user.uid}/weaponLookup/secondaries/${secondaryId}`)
						.update({ [loadoutId]: true })

					return snap
				})
				.then((snap) =>
					database
						.ref(`loadouts/${auth.user.uid}/loadouts/${loadoutId}/secondaries`)
						.update({ [snap.key]: snap.val() })
				)
		},
		addAttachmentToPrimary: (loadoutId, primaryId, attachmentId) => {
			return attachments
				.getById(attachmentId)
				.then((snap) =>
					database
						.ref(`loadouts/${auth.user.uid}/loadouts/${loadoutId}/primaries/${primaryId}/attachments`)
						.update({ [snap.key]: snap.val() })
				)
		},
		addAttachmentToSecondary: (loadoutId, secondaryId, attachmentId) => {
			return attachments
				.getById(attachmentId)
				.then((snap) =>
					database
						.ref(`loadouts/${auth.user.uid}/loadouts/${loadoutId}/secondaries/${secondaryId}/attachments`)
						.update({ [snap.key]: snap.val() })
				)
		}
	}
}
