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
		// Ensure this user owns weapon, attachment and loadout
		let canAdd = await hasPermission(weaponId, attachmentId, loadoutId, user.uid)

		if (!canAdd) {
			throw new errors.NotFoundError('Loadout, weapon or attachment not found')
		}		

		let exists = await count(weaponId, attachmentId, loadoutId)

		if (!exists) {
			await add(weaponId, attachmentId, loadoutId)
		}

		return await entities().attachment.findByPk(attachmentId)		
	},

	delete: async (weaponId, attachmentId, loadoutId, user) => {
		// Ensure this user owns both weapon and loadout
		let canDelete = await hasPermission(weaponId, attachmentId, loadoutId, user.uid)

		if (!canDelete) {
			throw new errors.NotFoundError('Loadout, weapon or attachment not found')
		}

		// Remove
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
	}
}
