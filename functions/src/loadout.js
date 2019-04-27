const functions = require('./firebase-functions-extensions')
const entities = require('./database/entities')
const baseEntity = require('./base-entity')

module.exports = {
	...baseEntity(entities().loadout, 'loadout'),
	getAll: functions.https.onAuthedCall(async (data, context) => {
		try {
			let loadouts = await entities().loadout.findAll({
				where: {
					uid: context.auth.uid
				},
				include: [
					{
						model: entities().weapon,
						attributes: {
							exclude: ['uid']
						},
						// Prevents the association table (loadout_weapon) coming down too
						through: { attributes: [] }
					}
				],
				attributes: {
					exclude: ['uid']
				}
			})

			// Hacky way to get the raw, nested data
			// Can't figure out how to get sequelize to do this!
			// raw=true doesnt work
			let data = JSON.parse(JSON.stringify(loadouts))
			console.log('Successfuly retrieved loadouts', JSON.stringify(data))

			return data
		} catch (e) {
			console.error(`Error retrieving loadouts for ${context.auth.uid}`, e)
			return new functions.https.HttpsError('unknown', null, 'Unexpected error retrieving data')
		}
	}),

	getById: functions.https.onAuthedCall(async (id, context) => {
		if (!id) {
			console.warn(`No id was supplied for getting loadout by id for ${context.auth.uid}`)
		}

		try {
			let loadout = await entities().loadout.findOne({
				where: {
					displayId: id,
					uid: context.auth.uid
				},
				include: [
					{
						model: entities().weapon,
						attributes: {
							exclude: ['uid']
						},
						include: [
							{
								model: entities().attachment,
								through: { attributes: [] }
							}
						],
						through: { attributes: [] }
					},
					{
						model: entities().gear,
						as: 'gear',
						attributes: {
							exclude: ['uid']
						},
						through: { attributes: [] }
					}
				],
				attributes: {
					exclude: ['uid']
				}
			})

			console.log('Successfuly retrieved loadout', loadout.id)

			return loadout.toJSON()
		} catch (e) {
			console.error(`Error retrieving loadout for ${context.auth.uid}`, e)
			return new functions.https.HttpsError('unknown', null, 'Unexpected error retrieving data')
		}
	})
}
