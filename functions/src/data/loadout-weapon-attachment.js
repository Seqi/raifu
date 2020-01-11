const entities = require('./database/entities')
const errors = require('../utils/errors')

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
		attributes: ['id']
	})

	await entities().loadoutWeaponAttachment.create({
		loadout_weapon_id: loadoutWeapon.id,
		loadout_id: loadoutId,
		weapon_id: weaponId,
		attachment_id: attachmentId
	})
}

module.exports = {
	add: async (weaponId, attachmentId, loadoutId, user) => {
		// Validate
		if (!weaponId || !loadoutId || !attachmentId) {
			throw new errors.BadRequestError(`WeaponId, LoadoutId & AttachmentId missing by ${user.uid}`)
		}

		// Ensure this user owns weapon, attachment and loadout
		try {
			let canAdd = await hasPermission(weaponId, attachmentId, loadoutId, user.uid)

			if (!canAdd) {
				throw new errors.NotFoundError('Loadout, weapon or attachment not found')
			}
		} catch (e) {
			console.log('Error retrieving permission to add loadout weapon attachment', e.message, user.uid)
			throw e
		}

		try {
			let exists = await count(weaponId, attachmentId, loadoutId)

			if (!exists) {			
				console.log(`Adding loadout weapon attachment. 
					LoadoutId: ${loadoutId}. 
					WeaponId: ${weaponId}
					AttachmentId: ${attachmentId}`)

				await add(weaponId, attachmentId, loadoutId)
			}

			return await entities().attachment.findByPk(attachmentId)
		} catch (e) {			
			console.log('Error adding loadout weapon attachment to database', e.message)
			throw e
		}
	},

	delete: async (weaponId, attachmentId, loadoutId, user) => {
		// Validate
		if (!weaponId || !loadoutId || !attachmentId) {
			throw new errors.BadRequestError(`WeaponId, LoadoutId & AttachmentId missing by ${user.uid}`)
		}

		// Ensure this user owns both weapon and loadout
		try {
			let canDelete = await hasPermission(weaponId, attachmentId, loadoutId, user.uid)

			if (!canDelete) {
				throw new errors.NotFoundError('Loadout, weapon or attachment not found')
			}
		} catch (e) {
			console.log('Error retrieving permission to remove loadout weapon attachment', e.message, user.uid)
			throw e
		}

		// Remove
		try {
			console.log(`Removing loadout weapon attachment. 
				LoadoutId: ${loadoutId}. 
				WeaponId: ${weaponId}
				AttachmentId: ${attachmentId}`)

			let result = await entities().loadoutWeaponAttachment.destroy({
				where: {
					loadout_id: loadoutId,
					weapon_id: weaponId,
					attachment_id: attachmentId
				}
			})
			
			if (result === 0) {
				throw new errors.NotFoundError('Loadout or weapon not found')
			}	
		} catch (e) {	
			console.log('Error removing loadout weapon attachment to database', e.message)
			throw e	
		}
	}
}
