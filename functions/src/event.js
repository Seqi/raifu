const functions = require('./firebase-functions-extensions')
const entities = require('./database/entities')
const baseEntity = require('./base-entity')

module.exports = {
	...baseEntity(entities().event, 'event'),
	getAll: functions.https.onAuthedCall(async (data, context) => {
		try {
			let events = await entities().event.findAll({
				where: {
					uid: context.auth.uid
				},
				include: {
					model: entities().loadout,				
					attributes: {
						exclude: ['uid']
					}
				}, 
				attributes: {
					exclude: ['uid', 'loadout_id']
				}
			})
			
			let result = JSON.parse(JSON.stringify(events))
			console.log('Successfuly retrieved events', JSON.stringify(result))

			return result
		} catch (e) {			
			console.error(`Error retrieving events for ${context.auth.uid}`, e)
			return new functions.https.HttpsError('unknown', null, 'Unexpected error retrieving data')
		}
	}),
	
	getById: functions.https.onAuthedCall(async (id, context) => {
		if (!id) {
			console.warn(`No id was supplied for getting event by id for ${context.auth.uid}`)
			return null
		}

		try {
			let event = await entities().event.findOne({
				where: {
					id: id,
					uid: context.auth.uid
				},
				include: {
					model: entities().loadout,				
					attributes: {
						exclude: ['uid']
					}
				}, 
				attributes: {
					exclude: ['uid', 'loadout_id']
				}
			})
			
			console.log('Successfuly retrieved event', event.id)

			return event.toJSON()
		} catch (e) {			
			console.error(`Error retrieving events for ${context.auth.uid}`, e)
			return new functions.https.HttpsError('unknown', null, 'Unexpected error retrieving data')
		}
	})
}