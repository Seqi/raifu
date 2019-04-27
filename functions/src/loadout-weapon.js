const entities = require('./database/entities')
const functions = require('./firebase-functions-extensions')
const error = require('./error')

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
	add: functions.https.onAuthedCall(async (data, context) => {
		// Validate
		if (!data.weaponId || !data.loadoutId) {
			return error('invalid-argument', null, `WeaponId and LoadoutId missing by ${context.auth.uid}`)
		}

		// Ensure this user owns both weapon and loadout
		try {
			let canAdd = await hasPermission(data.weaponId, data.loadoutId, context.auth.uid)

			if (!canAdd) {
				return error('not-found', null, 'weapon or loadout not found')
			}
		} catch (e) {
			return error('invalid-argument', e, 'Error retrieving data from database')
		}

		// Check if exists
		try {
			let exists = await count(data.weaponId, data.loadoutId)

			if (!exists) {
				// Add
				console.log('Adding loadout weapon', data)
				await entities().loadoutWeapon.create({
					loadout_id: data.loadoutId,
					weapon_id: data.weaponId
				})
			}

			return await entities().weapon.findByPk(data.weaponId, { raw: true })
		} catch (e) {
			return error('invalid-argument', e, 'Error adding loadout weapon to database')
		}
	}),

	delete: functions.https.onAuthedCall(async (data, context) => {
		// Validate
		if (!data.weaponId || !data.loadoutId) {
			return error('invalid-argument', null, `WeaponId and LoadoutId missing by ${context.auth.uid}`)
		}

		// Ensure this user owns both weapon and loadout
		try {
			let canDelete = await hasPermission(data.weaponId, data.loadoutId, context.auth.uid)

			if (!canDelete) {
				return error('not-found', null, 'weapon or loadout not found')
			}
		} catch (e) {
			return error('invalid-argument', e, 'Error retrieving data from database')
		}

		// Remove
		try {
			console.log('Removing loadout weapon', data)
			return (await entities().loadoutWeapon.destroy({
				where: {
					loadout_id: data.loadoutId,
					weapon_id: data.weaponId
				}
			}))
		} catch (e) {
			return error('invalid-argument', e, 'Error adding loadout weapon to database')
		}
	})
}
