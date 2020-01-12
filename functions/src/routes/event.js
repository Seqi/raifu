let express = require('express')
let router = express.Router()

let event = require('../data/event')
let errors = require('../utils/errors')

router.get('/', async (req, res) => {
	try {
		let items = await event.getAll(req.user)

		console.log(`[${req.user.uid}]: Successfuly retrieved ${items.length} events`)

		return res.json(items)
	} 
	catch (e) {
		console.error(`[${req.user.uid}]: Error retrieving events`, e)

		res.status(500)
			.end()
	}
})

router.get('/:id', async (req, res) => {
	let eventId = req.params.id

	try {
		if (!req.params.id) {
			res.status(400)
				.json({ error: 'Id is required' })
		}

		let item = await event.getById(eventId, req.user)

		if (!item) {
			console.log(`[${req.user.uid}]: Could not retrieve event with id `, req.params.id)
			return res.status(404)
				.end()
		}

		console.log(`[${req.user.uid}]: Successfuly retrieved event ${JSON.stringify(item)}`)
		
		return res.json(item)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Could not find event with id (${req.params.id})`)
			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error retrieving event with id ${eventId}`, e)
		return res.status(500)
			.end()
	}
})

router.post('/', async (req, res) => {
	try {		
		let item = await event.add(req.body, req.user)
		
		console.log(`[${req.user.uid}]: Created event ${JSON.stringify(item)}`)

		return res.json(item)
	} 
	catch (e) {
		if (e instanceof errors.BadRequestError) {
			console.warn(`[${req.user.uid}]: Bad request when creating event ${e.message}`)
			return res.status(400)
				.json({ errors: e.message.split(',') })
		}

		console.error(`[${req.user.uid}]: Error creating event`, e)
		return res.status(500)
			.end()
	}
})

router.put('/:id', async (req, res) => {
	let eventId = req.params.id

	try {
		let canEdit = await event.canEdit(eventId, req.user)
		if (!canEdit) {
			return res.status(401)
				.end()
		}

		let item = await event.edit(eventId, req.body, req.user)
		
		console.log(`[${req.user.uid}]: Updated event ${JSON.stringify(item)}`)

		return res.status(204)
			.end()
	} 
	catch (e) {
		if (e instanceof errors.BadRequestError) {
			console.warn(`[${req.user.uid}]: Bad request when updating event ${e.message}`)
			return res.status(400)
				.json({ errors: e })
		}

		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Could not find event to update with id (${eventId})`)
			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error updating event`, e)
		return res.status(500)
			.end()
	}
})

router.delete('/:id', async (req, res) => {
	let eventId = req.params.id

	try {
		let canEdit = await event.canEdit(eventId, req.user)
		if (!canEdit) {
			return res.status(401)
				.end()
		}

		await event.remove(eventId, req.user)

		console.log(`[${req.user.uid}]: Deleted event`, eventId)

		return res.status(204)
			.end()
	} 
	catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Attempted to delete event that does not exist (${eventId})`)

			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error deleting event`, e)
		return res.status(500)
			.end()
	}
})

router.post('/:eventId/loadout/remove', async (req, res) => {
	let eventId = req.params.eventId

	try {
		let newEvent = await event.setLoadout(eventId, null, req.user)
		console.log(`[${req.user.uid}]: Removed loadout from event ${eventId}`)

		return res.json(newEvent)
	} 
	catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Attempted to remove loadout on event that does not exist (eventId: ${eventId})`)

			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error removing loadout from event`, e)
		return res.status(500)
			.end()
	}
})

router.post('/:eventId/loadout/:loadoutId', async (req, res) => {
	let eventId = req.params.eventId
	let loadoutId = req.params.loadoutId

	try {		
		let newEvent = await event.setLoadout(eventId, loadoutId, req.user)
		console.log(`[${req.user.uid}]: Added loadout ${loadoutId} to event ${eventId}`)

		return res.json(newEvent)
	} 
	catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Attempted to add loadout on event that does not exist (eventId: ${eventId} loadoutId: ${loadoutId})`)
			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error adding loadout to event`, e)
		return res.status(500)
			.end()
	}
})

router.post('/:eventId/join', async (req, res) => {
	let eventId = req.params.eventId

	try {
		await event.join(eventId, req.user)
		console.log(`[${req.user.uid}]: Joined event ${eventId}`)

		return res.status(204)
			.end()
	} 
	catch (e) {
		console.log('Error adding loadout to event', e)
		if (e instanceof errors.BadRequestError) {
			console.warn(`[${req.user.uid}]: Tried to join an event they're already in`)
			return res.status(400)
				.end(e.message)
		}

		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Attempted to join an event that does not exist (${eventId})`)
			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error joining event`, e)
		return res.status(500)
			.end()
	}
})

module.exports = router
