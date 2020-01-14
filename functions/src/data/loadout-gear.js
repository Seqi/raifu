const { LoadoutGear, Loadout, Gear } = require('./database/entities')
const errors = require('../utils/errors')

let hasPermission = async (gearId, loadoutId, authId) => {
	let ownsGear = Gear.count({
		where: {
			id: gearId,
			uid: authId
		}
	})

	let ownsLoadout = Loadout.count({
		where: {
			id: loadoutId,
			uid: authId
		}
	})

	let result = await Promise.all([ownsGear, ownsLoadout])
	return result.every((r) => r > 0)
}

let count = async (gearId, loadoutId) => {
	return await LoadoutGear.count({
		where: {
			loadout_id: loadoutId,
			gear_id: gearId
		}
	})
}

module.exports = {
	add: async (gearId, loadoutId, user) => {
		// Ensure this user owns both gear and loadout
		let canAdd = await hasPermission(gearId, loadoutId, user.uid)

		if (!canAdd) {
			throw new errors.NotFoundError('Loadout or gear not found')
		}
		let exists = await count(gearId, loadoutId)

		if (!exists) {
			await LoadoutGear.create({
				loadout_id: loadoutId,
				gear_id: gearId
			})
		}

		return await Gear.findByPk(gearId)		
	},

	delete: async (gearId, loadoutId, user) => {
		// Ensure this user owns both gear and loadout
		let canDelete = await hasPermission(gearId, loadoutId, user.uid)

		if (!canDelete) {
			throw new errors.NotFoundError('Loadout or gear not found')
		}
		
		let result = await LoadoutGear.destroy({
			where: {
				loadout_id: loadoutId,
				gear_id: gearId
			}
		})

		if (result === 0) {
			throw new errors.NotFoundError('Loadout or gear not found')
		}			
	}
}
