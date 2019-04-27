const entities = require('./database/entities')
const functions = require('./firebase-functions-extensions')
const error = require('./error')

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
	add: functions.https.onAuthedCall(async (data, context) => {
		// Validate
		if (!data.gearId || !data.loadoutId) {
			return error('invalid-argument', null, `GearId and LoadoutId missing by ${context.auth.uid}`)
		}

		// Ensure this user owns both gear and loadout
		try {
			let canAdd = await hasPermission(data.gearId, data.loadoutId, context.auth.uid)

			if (!canAdd) {
				return error('not-found', null, 'gear or loadout not found')
			}
		} catch (e) {
			return error('invalid-argument', e, 'Error retrieving data from database')
		}

		// Check if exists
		try {
			let exists = await count(data.gearId, data.loadoutId)

			if (!exists) {
				// Add
				console.log('Adding loadout gear', data)
				await entities().loadoutGear.create({
					loadout_id: data.loadoutId,
					gear_id: data.gearId
				})
			}

			return await entities().gear.findByPk(data.gearId, { raw: true })
		} catch (e) {
			return error('invalid-argument', e, 'Error adding loadout gear to database')
		}
	}),

	delete: functions.https.onAuthedCall(async (data, context) => {
		// Validate
		if (!data.gearId || !data.loadoutId) {
			return error('invalid-argument', null, `GearId and LoadoutId missing by ${context.auth.uid}`)
		}

		// Ensure this user owns both gear and loadout
		try {
			let canDelete = await hasPermission(data.gearId, data.loadoutId, context.auth.uid)

			if (!canDelete) {
				return error('not-found', null, 'gear or loadout not found')
			}
		} catch (e) {
			return error('invalid-argument', e, 'Error retrieving data from database')
		}

		// Remove
		try {
			console.log('Removing loadout gear', data)
			return (await entities().loadoutGear.destroy({
				where: {
					loadout_id: data.loadoutId,
					gear_id: data.gearId
				}
			}))
		} catch (e) {
			return error('invalid-argument', e, 'Error adding loadout gear to database')
		}
	})
}
