const entities = require('./database/entities')
const errors = require('../utils/errors')

let hasPermission = async (clothingId, loadoutId, authId) => {
	let ownsClothing = entities().clothing.count({
		where: {
			id: clothingId,
			uid: authId
		}
	})

	let ownsLoadout = entities().loadout.count({
		where: {
			id: loadoutId,
			uid: authId
		}
	})

	let result = await Promise.all([ownsClothing, ownsLoadout])
	return result.every((r) => r > 0)
}

let count = async (clothingId, loadoutId) => {
	return await entities().loadoutClothing.count({
		where: {
			loadout_id: loadoutId,
			clothing_id: clothingId
		}
	})
}

module.exports = {
	add: async (clothingId, loadoutId, user) => {
		// Ensure this user owns both clothing and loadout
		let canAdd = await hasPermission(clothingId, loadoutId, user.uid)

		if (!canAdd) {
			throw new errors.NotFoundError('Loadout or clothing not found')
		}		

		// Ensure this combination doesnt already exist
		let exists = await count(clothingId, loadoutId)

		if (!exists) {
			await entities().loadoutClothing.create({
				loadout_id: loadoutId,
				clothing_id: clothingId
			})
		}

		return await entities().clothing.findByPk(clothingId)		
	},

	delete: async (clothingId, loadoutId, user) => {
		// Ensure this user owns both clothing and loadout
		let canDelete = await hasPermission(clothingId, loadoutId, user.uid)

		if (!canDelete) {
			throw new errors.NotFoundError('Loadout or clothing not found')
		}		

		let result = await entities().loadoutClothing.destroy({
			where: {
				loadout_id: loadoutId,
				clothing_id: clothingId
			}
		})

		if (result === 0) {
			throw new errors.NotFoundError('Loadout or clothing not found')
		}		
	}
}
