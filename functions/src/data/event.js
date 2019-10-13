const entities = require('./database/entities')
const baseEntity = require('./base-entity')
const errors = require('../utils/errors')
const loadout = require('./loadout')

module.exports = {
	...baseEntity(entities().event, 'event'),
	getAll: async (user) => {
		try {
			let events = await entities().event.findAll({
				include: {
					// Only bring back events that the user is part of
					model: entities().eventUsers,
					where: {
						uid: user.uid
					},
					include: {
						model: entities().loadout,				
						attributes: {
							exclude: ['uid']
						},
						include: {
							model: entities().weapon,			
							attributes: {
								exclude: ['uid']
							}
						}
					}, 				
					attributes: {
						exclude: ['uid', 'loadout_id', 'event_id']
					},
				},
				order: ['createdAt']
			})
			
			let result = JSON.parse(JSON.stringify(events))
			console.log('Successfuly retrieved events', JSON.stringify(result))

			result.forEach(event => event.loadout && loadout.orderLoadoutItems(event.loadout))

			return result
		} catch (e) {			
			console.error(`Error retrieving events for ${user.id}`, e)
			throw e
		}
	},
	
	getById: async (id, user) => {
		if (!id) {
			console.warn(`No id was supplied for getting event by id for ${user.uid}`)
			throw new errors.NotFoundError()
		}

		try {
			let event = await entities().event.findOne({
				where: {
					id: id,
				},
				include: {
					model: entities().eventUsers,
					where: {
						uid: user.uid
					},
					include: {
						model: entities().loadout,				
						attributes: {
							exclude: ['uid']
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
										attributes: {
											exclude: ['uid']
										}
									}
								]
							},					
							{
								model: entities().gear,
								as: 'gear',
								attributes: {
									exclude: ['uid']
								}
							}
						],
					}
				}, 
				attributes: {
					exclude: ['uid', 'loadout_id']
				}
			})
			
			// TODO: have this as a hook?
			loadout.orderLoadoutItems(event.loadout)
			
			console.log('Successfuly retrieved event', event.id)

			return event.toJSON()
		} catch (e) {			
			console.error(`Error retrieving events for ${user.uid}`, e)
			throw e
		}
	}
}