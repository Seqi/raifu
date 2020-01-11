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
		if (!clothingId || !loadoutId) {
			throw new errors.BadRequestError(`ClothingId and LoadoutId missing by ${user.uid}`)
		}

		// Ensure this user owns both clothing and loadout
		try {
			let canAdd = await hasPermission(clothingId, loadoutId, user.uid)

			if (!canAdd) {
				throw new errors.NotFoundError('Loadout or clothing not found')
			}
		} catch (e) {
			console.log('Error retrieving permission to add loadout clothing', e.message, user.uid)
			throw e
		}

		try {
			let exists = await count(clothingId, loadoutId)

			if (!exists) {
				console.log(`Adding loadout clothing. LoadoutId: ${loadoutId}. ClothingId: ${clothingId}`)
				await entities().loadoutClothing.create({
					loadout_id: loadoutId,
					clothing_id: clothingId
				})
			}

			return await entities().clothing.findByPk(clothingId)
		} catch (e) {
			console.log('Error adding loadout clothing to database', e.message)
			throw e
		}
	},

	delete: async (clothingId, loadoutId, user) => {
		// Validate
		if (!clothingId || !loadoutId) {
			throw new errors.BadRequestError(`ClothingId and LoadoutId missing by ${user.uid}`)
		}

		// Ensure this user owns both clothing and loadout
		try {
			let canDelete = await hasPermission(clothingId, loadoutId, user.uid)

			if (!canDelete) {
				throw new errors.NotFoundError('Loadout or clothing not found')
			}
		} catch (e) {
			console.log('Error retrieving permission to delete loadout clothing', e.message, user.uid)
			throw e
		}

		try {
			console.log(`Removing loadout clothing. LoadoutId: ${loadoutId}. ClothingId: ${clothingId}`)
			let result = await entities().loadoutClothing.destroy({
				where: {
					loadout_id: loadoutId,
					clothing_id: clothingId
				}
			})

			if (result === 0) {
				throw new errors.NotFoundError('Loadout or clothing not found')
			}			
		} catch (e) {
			console.log('Error removing loadout clothing from database', e.message)
			throw e
		}
	}
}
