const entities = require('./database/entities')
const errors = require('../utils/errors')

let hasPermission = async (weaponId, loadoutId, authId) => {
	let ownsWeapon = entities().weapon.count({
		where: {
			id: weaponId,
			uid: authId
		}
	})

	let ownsLoadout = entities().loadout.count({
		where: {
			id: loadoutId,
			uid: authId
		}
	})

	let result = await Promise.all([ownsWeapon, ownsLoadout])
	return result.every((r) => r > 0)
}

let count = async (weaponId, loadoutId) => {
	return await entities().loadoutWeapon.count({
		where: {
			loadout_id: loadoutId,
			weapon_id: weaponId
		}
	})
}

module.exports = {
	add: async (weaponId, loadoutId, user) => {
		// Validate
		if (!weaponId || !loadoutId) {
			throw new errors.BadRequestError(`WeaponId and LoadoutId missing by ${user.uid}`)
		}

		// Ensure this user owns both weapon and loadout
		try {
			let canAdd = await hasPermission(weaponId, loadoutId, user.uid)

			if (!canAdd) {
				throw new errors.NotFoundError('Loadout or weapon not found')
			}
		} catch (e) {
			console.log('error retrieving permission to add loadout weapon', e.message, user.uid)
			throw e
		}

		try {
			let exists = await count(weaponId, loadoutId)

			if (!exists) {
				console.log(`Adding loadout weapon. LoadoutId: ${loadoutId}. WeaponId: ${weaponId}`)
				await entities().loadoutWeapon.create({
					loadout_id: loadoutId,
					weapon_id: weaponId
				})
			}

			return await entities().weapon.findByPk(weaponId)
		} catch (e) {
			console.log('Error adding loadout weapon to database', e.message)
			throw e
		}
	},

	delete: async (weaponId, loadoutId, user) => {
		// Validate
		if (!weaponId || !loadoutId) {
			throw new errors.BadRequestError(`WeaponId and LoadoutId missing by ${user.uid}`)
		}

		// Ensure this user owns both weapon and loadout
		try {
			let canDelete = await hasPermission(weaponId, loadoutId, user.uid)

			if (!canDelete) {
				throw new errors.NotFoundError('Loadout or weapon not found')
			}
		} catch (e) {
			console.log('Error retrieving permission to delete loadout weapon', e.message, user.uid)
			throw e
		}

		try {
			console.log(`Removing loadout weapon. LoadoutId: ${loadoutId}. WeaponId: ${weaponId}`)
			let result = await entities().loadoutWeapon.destroy({
				where: {
					loadout_id: loadoutId,
					weapon_id: weaponId
				}
			})

			if (result === 0) {
				throw new errors.NotFoundError('Loadout or weapon not found')
			}			
		} catch (e) {
			console.log('Error removing loadout weapon from database', e.message)
			throw e
		}
	}
}
