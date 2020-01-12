const firebase = require('firebase-admin')
const Op = require('sequelize').Op
const entities = require('./database/entities')
const errors = require('../utils/errors')

const db = require('./database/database')

let getAll = async (user) => {
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

	return events.forEach(event => event.toJSON())
	
}

let getById = async (id, user) => {
	if (!id) {
		console.warn(`No id was supplied for getting event by id for ${user.uid}`)
		throw new errors.NotFoundError()
	}

	let event = await entities().event.findOne({
		include: {
			model: entities().eventUser,
			as: 'users',
			where: {
				event_id: id,
				[Op.or]: {
					uid: user.uid,
					'$event.public$': true
				}
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
					},					
					{
						model: entities().clothing,
						as: 'clothing',
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

	if (!event) {
		return null
	}

	let eventJson = event.toJSON()

	// Always put the calling user's event first
	// TODO: have this as a hook?
	let currUserIdx = eventJson.users.findIndex(u => u.uid === user.uid)

	// If its a public event where the user doesnt exist on it, don't show the users info
	if (currUserIdx < 0) {
		eventJson.users = []
		return eventJson
	}

	// Create a copy of the event users and the one to move
	let currUserEvent = eventJson.users[currUserIdx]
	let eventUsers = [ ...eventJson.users ]

	// Remove the user and place at the start
	eventUsers.splice(currUserIdx, 1)
	eventUsers.unshift(currUserEvent)

	// Populate each event user with a hydrated user object for display purposes
	// No need to do the current user, we alredy have that
	eventUsers[0].displayName = user.name
		
	let fbAuth = firebase.auth()
	let fbUsers = await Promise.all(
		eventUsers.slice(1)
			.map(user => user.uid)
			.map(uid => fbAuth.getUser(uid))
	)

	fbUsers.forEach(fbUser => 
		eventUsers.find(u => u.uid === fbUser.uid).displayName = fbUser.displayName
	)

	// Add back
	eventJson.users = eventUsers

	return eventJson	
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

		if (message) {
			throw new errors.BadRequestError(message)
		} else {
			throw e
		}
	}
}

let canEdit = async (id, user) => {
	if (!id) {
		throw new errors.BadRequestError('Id is required')
	}

	// Ensure this id exists and belongs to the user
	let event = await entities().event.findOne({
		where: { id },
		attributes: ['organiser_uid']
	})

	return event.organiser_uid === user.uid	
}

let edit = async (id, event, user) => {
	if (!id) {
		throw new errors.BadRequestError('Id is required')
	}

	try {
		// Ensure this id exists and belongs to the user
		let exists = (await entities().event.count({
			where: {
				id: id,
				organiser_uid: user.uid
			}
		})) === 1

		if (!exists) {
			throw new errors.NotFoundError()
		}

		// Manually set the fields to update. Saves messing around with preventing overwrites
		let newEvent = {
			name: event.name,
			location: event.location,
			date: event.date,
			public: event.public
		}

		await entities().event.update(newEvent, {
			where: {
				id: id,
				organiser_uid: user.uid
			}
		})

		return newEvent
	} catch (e) {
		// Validation errors are contained in an array, so pick them out
		let message = e.errors && e.errors.map((error) => error.message)

		if (message) {
			throw new errors.BadRequestError(message)
		} else {
			throw e
		}
	}
}

let remove = async (id, user) => {
	let result = await entities().event.destroy({
		where: {
			id: id,
			organiser_uid: user.uid
		}
	})

	if (result === 0) {
		throw new errors.NotFoundError()
	}
}

let setLoadout = async (eventId, loadoutId, user) => {
	// Check the user has access to this event
	let hasEvent = await entities().eventUser.count({
		where: {
			uid: user.uid,
			event_id: eventId
		}
	})

	if (!hasEvent) {
		throw new errors.NotFoundError('Could not find event.')
	}

	// Check user has access to loadout
	if (loadoutId != null) {
		let hasLoadout = entities().loadout.count({
			id: loadoutId,
			uid: user.uid
		})

		if (!hasLoadout) {
			throw new errors.NotFoundError('Could not find loadout.')
		}
	}

	// Update the event user and return the full event object back
	let rowsUpdated = await entities().eventUser
		.update(
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
}

let join = async (eventId, user) => {
	// Check the event is joinable
	let joinable = await entities().event.count({
		where: {
			id: eventId,
			public: true
		}
	})

	if (!joinable) {
		throw errors.NotFoundError('Could not find a joinable event')
	}

	// Check the user isn't already part of this event
	let alreadyInEvent = await entities().eventUser.count({
		where: {
			event_id: eventId,
			uid: user.uid
		}
	}) > 0

	if (alreadyInEvent) {
		throw new errors.BadRequestError('User already in event')
	}

	// Add the user
	await entities().eventUser.create({
		event_id: eventId,
		uid: user.uid
	})
}

module.exports = {
	getAll,
	getById,
	add,
	edit,
	remove,
	canEdit,
	setLoadout,
	join
}