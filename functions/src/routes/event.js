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
		res.status(500)
			.end()
	}
})

router.get('/:id', async (req, res) => {
	try {
		if (!req.params.id) {
			res.status(400)
				.json({ error: 'Id is required' })
		}

		let item = await event.getById(req.params.id, req.user)

		if (!item) {
			console.log(`[${req.user.uid}]: Could not retrieve event with id `, req.params.id)
			return res.status(404)
				.end()
		}

		console.log(`[${req.user.uid}]: Successfuly retrieved event ${JSON.stringify(item)}`)
		
		return res.json(item)
	} catch (e) {
		if (e instanceof errors.BadRequestError) {
			return res.status(400)
				.json({ errors: e })
		}

		if (e instanceof errors.NotFoundError) {
			return res.status(404)
				.end()
		}

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
			return res.status(400)
				.json({ errors: e.message.split(',') })
		}

		return res.status(500)
			.end()
	}
})

router.put('/:id', async (req, res) => {
	try {
		let eventId = req.params.id

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
			return res.status(400)
				.json({ errors: e })
		}

		if (e instanceof errors.NotFoundError) {
			return res.status(404)
				.end()
		}

		return res.status(500)
			.end()
	}
})

router.delete('/:id', async (req, res) => {
	try {
		let eventId = req.params.id

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
		console.log('Error deleting event', e)
		if (e instanceof errors.BadRequestError) {
			return res.status(400)
				.end(e.message)
		}

		if (e instanceof errors.NotFoundError) {
			console.warn(`Entity with id ${req.params.id} does not exist for user ${req.user.uid}`)

			return res.status(404)
				.end()
		}

		return res.status(500)
			.end()
	}
})

router.post('/:eventId/loadout/remove', async (req, res) => {
	try {
		let eventId = req.params.eventId

		let newEvent = await event.setLoadout(eventId, null, req.user)
		console.log(`[${req.user.uid}]: Removed loadout from event ${eventId}`)

		return res.json(newEvent)
	} 
	catch (e) {
		console.log('Error adding loadout to event', e)
		if (e instanceof errors.BadRequestError) {
			return res.status(400)
				.end(e.message)
		}

		if (e instanceof errors.NotFoundError) {
			return res.status(404)
				.end()
		}

		return res.status(500)
			.end()
	}
})

router.post('/:eventId/loadout/:loadoutId', async (req, res) => {
	try {
		let eventId = req.params.eventId
		let loadoutId = req.params.loadoutId

		let newEvent = await event.setLoadout(eventId, loadoutId, req.user)
		console.log(`[${req.user.uid}]: Added loadout ${loadoutId} to event ${eventId}`)

		return res.json(newEvent)
	} 
	catch (e) {
		console.log('Error adding loadout to event', e)
		if (e instanceof errors.BadRequestError) {
			return res.status(400)
				.end(e.message)
		}

		if (e instanceof errors.NotFoundError) {
			return res.status(404)
				.end()
		}

		return res.status(500)
			.end()
	}
})

router.post('/:eventId/join', async (req, res) => {
	try {
		let eventId = req.params.eventId

		await event.join(eventId, req.user)
		console.log(`[${req.user.uid}]: Joined event ${eventId}`)

		return res.status(204)
			.end()
	} 
	catch (e) {
		console.log('Error adding loadout to event', e)
		if (e instanceof errors.BadRequestError) {
			return res.status(400)
				.end(e.message)
		}

		if (e instanceof errors.NotFoundError) {
			return res.status(404)
				.end()
		}

		return res.status(500)
			.end()
	}
})

module.exports = router
