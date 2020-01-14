const { LoadoutWeapon, Loadout, Weapon } = require('./database/entities')
const errors = require('../utils/errors')

let hasPermission = async (weaponId, loadoutId, authId) => {
	let ownsWeapon = Weapon.count({
		where: {
			id: weaponId,
			uid: authId
		}
	})

	let ownsLoadout = Loadout.count({
		where: {
			id: loadoutId,
			uid: authId
		}
	})

	let result = await Promise.all([ownsWeapon, ownsLoadout])
	return result.every((r) => r > 0)
}

let count = async (weaponId, loadoutId) => {
	return await LoadoutWeapon.count({
		where: {
			loadout_id: loadoutId,
			weapon_id: weaponId
		}
	})
}

module.exports = {
	add: async (weaponId, loadoutId, user) => {
		// Ensure this user owns both weapon and loadout
		let canAdd = await hasPermission(weaponId, loadoutId, user.uid)

		if (!canAdd) {
			throw new errors.NotFoundError('Loadout or weapon not found')
		}

		// Ensure this combination doesnt already exist
		let exists = await count(weaponId, loadoutId)

		if (!exists) {
			await LoadoutWeapon.create({
				loadout_id: loadoutId,
				weapon_id: weaponId
			})
		}

		return await Weapon.findByPk(weaponId)
	},

	delete: async (weaponId, loadoutId, user) => {
		// Ensure this user owns both weapon and loadout
		let canDelete = await hasPermission(weaponId, loadoutId, user.uid)

		if (!canDelete) {
			throw new errors.NotFoundError('Loadout or weapon not found')
		}		

		let result = await LoadoutWeapon.destroy({
			where: {
				loadout_id: loadoutId,
				weapon_id: weaponId
			}
		})

		if (result === 0) {
			throw new errors.NotFoundError('Loadout or weapon not found')
		}			
	}
}
