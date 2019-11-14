let express = require('express')
let router = express.Router()

let event = require('../data/event')
let errors = require('../utils/errors')

router.get('/', async (req, res) => {
	try {
		let items = await event.getAll(req.user)

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
			return res.status(404)
				.end()
		}
		
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

		await event.edit(eventId, req.body, req.user)

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

module.exports = router
