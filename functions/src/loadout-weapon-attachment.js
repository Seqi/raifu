const entities = require('./database/entities')
const functions = require('./firebase-functions-extensions')
const error = require('./error')

let hasPermission = async (weaponId, attachmentId, loadoutId, authId) => {
	let ownsLoadoutWeapon = entities().loadoutWeapon.count({
		where: {
			weapon_id: weaponId,
			loadout_id: loadoutId
		},
		include: [
			{ model: entities().weapon, where: { uid: authId } },
			{ model: entities().loadout, where: { uid: authId } }
		]
	})

	let ownsAttachment = entities().attachment.count({
		where: {
			id: attachmentId,
			uid: authId
		}
	})

	let result = await Promise.all([ownsLoadoutWeapon, ownsAttachment])
	return result.every((r) => r > 0)
}

let count = async (weaponId, attachmentId, loadoutId) => {
	return await entities().loadoutWeaponAttachment.count({
		where: {
			loadout_id: loadoutId,
			weapon_id: weaponId,
			attachment_id: attachmentId
		}
	})
}

let add = async (weaponId, attachmentId, loadoutId) => {
	// Find the loadout_weapon id to add
	const loadoutWeapon = await entities().loadoutWeapon.findOne({
		where: {
			weapon_id: weaponId,
			loadout_id: loadoutId
		},
		attributes: ['id'],
		raw: true
	})

	await entities().loadoutWeaponAttachment.create({
		loadout_weapon_id: loadoutWeapon.id,
		loadout_id: loadoutId,
		weapon_id: weaponId,
		attachment_id: attachmentId
	})
}

module.exports = {
	add: functions.https.onAuthedCall(async (data, context) => {
		// Validate
		if (!data.weaponId || !data.loadoutId || !data.attachmentId) {
			return error('invalid-argument', null, `WeaponId, LoadoutId & AttachmentId missing by ${context.auth.uid}`)
		}

		// Ensure this user owns weapon, attachment and loadout
		try {
			let canAdd = await hasPermission(data.weaponId, data.attachmentId, data.loadoutId, context.auth.uid)

			if (!canAdd) {
				return error('not-found', null, 'weapon, attachment or loadout not found')
			}
		} catch (e) {
			return error('invalid-argument', e, 'Error retrieving data from database')
		}

		// Check if exists
		try {
			let exists = await count(data.weaponId, data.attachmentId, data.loadoutId)

			if (!exists) {
				await add(data.weaponId, data.attachmentId, data.loadoutId)
			}

			return await entities().attachment.findByPk(data.attachmentId, { raw: true })
		} catch (e) {
			return error('invalid-argument', e, 'Error adding loadout weapon attachment to database')
		}
	}),

	delete: functions.https.onAuthedCall(async (data, context) => {
		// Validate
		if (!data.weaponId || !data.loadoutId || !data.attachmentId) {
			return error('invalid-argument', null, `WeaponId, LoadoutId & AttachmentId missing by ${context.auth.uid}`)
		}

		// Ensure this user owns both weapon and loadout
		try {
			let canDelete = await hasPermission(data.weaponId, data.attachmentId, data.loadoutId, context.auth.uid)

			if (!canDelete) {
				return error('not-found', null, 'weapon, attachment or loadout not found')
			}
		} catch (e) {
			return error('invalid-argument', e, 'Error retrieving data from database')
		}

		// Remove
		try {
			console.log('Removing loadout weapon', data)
			return (await entities().loadoutWeaponAttachment.destroy({
				where: {
					loadout_id: data.loadoutId,
					weapon_id: data.weaponId,
					attachment_id: data.attachmentId
				}
			}))
		} catch (e) {
			return error('invalid-argument', e, 'Error deleting loadout weapon attachment from database')
		}
	})
}
