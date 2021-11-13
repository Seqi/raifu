const { logger } = require('firebase-functions')
let express = require('express')
let router = express.Router()

let event = require('../data/event')
let errors = require('../utils/errors')

router.get('/', async (req, res, next) => {
	try {
		logger.info('Retrieving event list', {
			userId: req.user.uid,
		})

		let items = await event.getAll(req.user)

		logger.info(`Successfuly retrieved ${items.length} events`, {
			userId: req.user.uid,
			itemCount: items.length,
			event: 'EVENT_LIST_VIEWED',
		})

		return res.json(items)
	} catch (e) {
		logger.error('Failed to retrieve event list.', { userId: req.user.uid })
		next(e)
	}
})

router.get('/:id', async (req, res, next) => {
	let eventId = req.params.id
	logger.info('Retrieving event.', { userId: req.user.uid, eventId })

	try {
		if (!req.params.id) {
			logger.warn('No Id was provided to fetch event.', { userId: req.user.uid, eventId })

			res.status(400)
				.json({ error: 'Id is required' })
		}

		let item = await event.getById(eventId, req.user)

		logger.info('Successfuly retrieved event', {
			userId: req.user.uid,
			eventId,
			event: 'EVENT_VIEWED',
		})

		return res.json(item)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Could not find event.', { userId: req.user.uid, eventId })
			return res.status(404)
				.end()
		}

		logger.error('Error retrieving event.', {
			userId: req.user.uid,
			eventId,
		})

		next(e)
	}
})

router.post('/', async (req, res, next) => {
	try {
		logger.info('Creating event.', { userId: req.user.uid, item: req.body })

		let item = await event.add(req.body, req.user)

		logger.info('Event created successfully.', {
			userId: req.user.uid,
			eventId: item.id,
			item: item,
			event: 'EVENT_CREATED',
		})

		return res.json(item)
	} catch (e) {
		if (e instanceof errors.BadRequestError) {
			logger.warn('Bad request when creating event.', {
				userId: req.user.uid,
				failure: e.message,
				item: req.body,
			})

			return res.status(400)
				.json({ errors: e.message.split(',') })
		}

		logger.error('Error creating event', {
			userId: req.user.uid,
			failure: e.message,
			item: req.body,
		})

		next(e)
	}
})

router.put('/:id', async (req, res, next) => {
	let eventId = req.params.id

	logger.info('Updating event.', { userId: req.user.uid, eventId, item: req.body })

	if (!eventId) {
		logger.warn('No Id was provided to update event.', { userId: req.user.uid, eventId })

		return res.status(400)
			.send('Event id is required')
	}

	try {
		let canEdit = await event.canEdit(eventId, req.user)
		if (!canEdit) {
			logger.warn('Do not have permission to edit this event.', {
				userId: req.user.uid,
				eventId,
				item: req.body,
			})

			return res.status(401)
				.end()
		}

		let item = await event.edit(eventId, req.body, req.user)

		logger.info('Updated event', {
			userId: req.user.uid,
			eventId,
			item: item,
			event: 'EVENT_UPDATED',
		})

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.BadRequestError) {
			logger.warn('Bad request when updating event.', {
				userId: req.user.uid,
				failure: e.message,
				item: req.body,
			})

			return res.status(400)
				.json({ errors: e.message.split(',') })
		}

		if (e instanceof errors.NotFoundError) {
			logger.warn('Could not find event.', { userId: req.user.uid, eventId })
			return res.status(404)
				.end()
		}

		logger.error('Error updating event.', {
			userId: req.user.uid,
			eventId,
			item: req.body,
		})

		next(e)
	}
})

router.delete('/:id', async (req, res, next) => {
	let eventId = req.params.id

	logger.info('Deleting event', { userId: req.user.uid, eventId })

	try {
		let canEdit = await event.canEdit(eventId, req.user)
		if (!canEdit) {
			logger.warn('Do not have permission to delete this event.', {
				userId: req.user.uid,
				eventId,
			})

			return res.status(401)
				.end()
		}

		await event.remove(eventId, req.user)

		logger.info('Successfully deleted event', {
			userId: req.user.uid,
			eventId,
			event: 'EVENT_DELETED',
		})

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Could not find event.', { userId: req.user.uid, eventId })

			return res.status(404)
				.end()
		}

		logger.error('Error deleting event.', { userId: req.user.uid, eventId })

		next(e)
	}
})

router.post('/:eventId/loadout/remove', async (req, res, next) => {
	let eventId = req.params.eventId

	logger.info('Removing loadout from event.', { user: req.user.uid, eventId })

	try {
		let newEvent = await event.setLoadout(eventId, null, req.user)

		logger.info('Successfully removed loadout from event.', {
			user: req.user.uid,
			eventId,
			event: 'EVENT_REMOVED_LOADOUT',
		})

		return res.json(newEvent)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Could not find event.', { userId: req.user.uid, eventId })

			return res.status(404)
				.end()
		}

		logger.error('Error removing loadout from event.', { userId: req.user.uid, eventId })

		next(e)
	}
})

router.post('/:eventId/loadout/:loadoutId', async (req, res, next) => {
	let eventId = req.params.eventId
	let loadoutId = req.params.loadoutId

	logger.info('Setting loadout on event.', { user: req.user.uid, eventId, loadoutId })

	try {
		let newEvent = await event.setLoadout(eventId, loadoutId, req.user)

		logger.info('Successfully set loadout on event.', {
			user: req.user.uid,
			eventId,
			loadoutId,
			event: 'EVENT_SET_LOADOUT',
		})

		return res.json(newEvent)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Could not find event.', { userId: req.user.uid, eventId, loadoutId })

			return res.status(404)
				.end()
		}

		logger.error('Error setting loadout on event.', {
			userId: req.user.uid,
			eventId,
			loadoutId,
		})

		next(e)
	}
})

router.post('/:eventId/join', async (req, res, next) => {
	let eventId = req.params.eventId

	logger.info('Joining event.', { user: req.user.uid, eventId })

	try {
		await event.join(eventId, req.user)

		logger.info('Successfully joined event.', {
			user: req.user.uid,
			eventId,
			event: 'EVENT_JOINED',
		})

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Attempted to join an event that does not exist.', {
				userId: req.user.uid,
				eventId,
			})

			return res.status(404)
		}

		logger.error('Error joining event.', { userId: req.user.uid, eventId })

		next(e)
	}
})

router.post('/:eventId/leave', async (req, res, next) => {
	let eventId = req.params.eventId

	logger.info('Leaving event.', { user: req.user.uid, eventId })

	try {
		await event.leave(eventId, req.user)

		logger.info('Successfully left event.', {
			user: req.user.uid,
			eventId,
			event: 'EVENT_LEFT',
		})

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Attempted to leave an event that does not exist.', {
				userId: req.user.uid,
				eventId,
			})

			return res.status(404)
				.end()
		}

		logger.error('Error leaving event.', { userId: req.user.uid, eventId })

		next(e)
	}
})

module.exports = router
