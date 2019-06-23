const entities = require('./database/entities')
const errors = require('../utils/errors')

let hasPermission = async (gearId, loadoutId, authId) => {
	let ownsGear = entities().gear.count({
		where: {
			id: gearId,
			uid: authId
		}
	})

	let ownsLoadout = entities().loadout.count({
		where: {
			id: loadoutId,
			uid: authId
		}
	})

	let result = await Promise.all([ownsGear, ownsLoadout])
	return result.every((r) => r > 0)
}

let count = async (gearId, loadoutId) => {
	return await entities().loadoutGear.count({
		where: {
			loadout_id: loadoutId,
			gear_id: gearId
		}
	})
}

module.exports = {
	add: async (gearId, loadoutId, user) => {
		// Validate
		console.log('##########', gearId, loadoutId)
		if (!gearId || !loadoutId) {
			throw new errors.BadRequestError(`GearId and LoadoutId missing by ${user.uid}`)
		}

		// Ensure this user owns both gear and loadout
		try {
			let canAdd = await hasPermission(gearId, loadoutId, user.uid)

			if (!canAdd) {
				throw new errors.NotFoundError('Loadout or gear not found')
			}
		} catch (e) {
			console.log('error retrieving permission to add loadout gear', e.message, user.uid)
			throw e
		}

		try {
			let exists = await count(gearId, loadoutId)

			if (!exists) {
				console.log(`Adding loadout gear. LoadoutId: ${loadoutId}. GearId: ${gearId}`)
				await entities().loadoutGear.create({
					loadout_id: loadoutId,
					gear_id: gearId
				})
			}

			return await entities().gear.findByPk(gearId, { raw: true })
		} catch (e) {
			console.log('Error adding loadout gear to database', e.message)
			throw e
		}
	},

	delete: async (gearId, loadoutId, user) => {
		// Validate
		if (!gearId || !loadoutId) {
			throw new errors.BadRequestError(`GearId and LoadoutId missing by ${user.uid}`)
		}

		// Ensure this user owns both gear and loadout
		try {
			let canDelete = await hasPermission(gearId, loadoutId, user.uid)

			if (!canDelete) {
				throw new errors.NotFoundError('Loadout or gear not found')
			}
		} catch (e) {
			console.log('error retrieving permission to delete loadout gear', e.message, user.uid)
			throw e
		}

		try {
			console.log(`Removing loadout gear. LoadoutId: ${loadoutId}. GearId: ${gearId}`)
			let result = await entities().loadoutGear.destroy({
				where: {
					loadout_id: loadoutId,
					gear_id: gearId
				}
			})

			if (result === 0) {
				throw new errors.NotFoundError('Loadout or gear not found')
			}			
		} catch (e) {
			console.log('Error removing loadout gear from database', e.message)
			throw e
		}
	}
}
