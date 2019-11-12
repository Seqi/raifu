const entities = require('./database/entities')
const baseEntity = require('./base-entity')
const errors = require('../utils/errors')
const loadout = require('./loadout')

const db = require('./database/database')


let getAll = async (user) => {
	try {
		let events = await entities().event.findAll({
			include: {
				// Only bring back events that the user is part of
				model: entities().eventUser,
				as: 'users',
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
}

let getById = async (id, user) => {
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
				model: entities().eventUser,
				as: 'users',
				where: {
					uid: user.uid
				},
				attributes: {
					exclude: [ 'id', 'event_id', 'loadout_id' ]
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

		let eventJson = event.toJSON()

		// Always put the calling user's event first
		// TODO: have this as a hook?
		let currUserIdx = eventJson.users.findIndex(u => u.uid === user.uid)

		// Create a copy of the event users and the one to move
		let currUserEvent = eventJson.users[currUserIdx]
		let eventUsersCopy = [ ...eventJson.users ]

		// Remove the user and place at the start
		eventUsersCopy.splice(currUserIdx, 1)
		eventUsersCopy.unshift(currUserEvent)

		// Add back
		eventJson.users = eventUsersCopy
		
		// TODO: have this as a hook?
		loadout.orderLoadoutItems(event.loadout)
		
		console.log('Successfuly retrieved event', event.id)

		return eventJson
	} catch (e) {			
		console.error(`Error retrieving events for ${user.uid}`, e)
		throw e
	}
}

let add = async (data, user) => {
	try {
		// Overwrite any attempts to hijack the id or uid
		delete data.id 

		let event = {
			...data,
			organiser_uid: user.uid,
			users: [{
				uid: user.uid
			}]
		}

		console.log('Creating event', JSON.stringify(event))

		let response = await db()
			.transaction(t =>  
				entities().event.create(event, {
					include: [{
						model: entities().eventUser,
						as: 'users'
					}],
					transaction: t
				})
			)			
		
		return response.toJSON()
	} catch (e) {
		// Validation errors are contained in an array, so pick them out
		let message = e.errors && e.errors.map((error) => error.message)
		console.error(message || e.message)

		if (message) {
			throw new errors.BadRequestError(message)
		} else {
			throw new Error(e.message)
		}
	}
}

let setLoadout = async (eventId, loadoutId, user) => {
	try {
		// Check the user has access to this event
		let hasEvent = await entities().eventUser.count({
			where: {
				uid: user.uid,
				event_id: eventId
			}
		})

		if (!hasEvent) {
			throw new errors.BadRequestError('Could not find event.')
		}

		// Check user has access to loadout
		if (loadoutId != null) {
			let hasLoadout = entities().loadout.count({
				id: loadoutId,
				uid: user.uid
			})

			if (!hasLoadout) {
				throw new errors.BadRequestError('Could not find loadout.')
			}
		}

		// Update the event user and return the full event object back
		let rowsUpdated = await entities().eventUser.update(
			{ loadout_id: loadoutId },
			{
				where: {
					uid: user.uid,
					event_id: eventId
				}
			}
		)	

		if (rowsUpdated === 0) {
			throw new Error('No rows were updated')
		}

		return await getById(eventId, user)

	} catch (e) {
		let message = e.message || (e.errors && e.errors.map((error) => error.message))

		console.error(`Error adding loadout to event for user ${user.uid}, ${message}`)
		throw e
	}
}

module.exports = {
	...baseEntity(entities().event, 'event'),
	getAll,
	getById,
	add,
	setLoadout
}