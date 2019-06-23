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
		
		return res.json(item)
	} catch (e) {
		if (e instanceof errors.BadRequestError) {
			return res.status(401)
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
			return res.status(401)
				.json({ errors: e.message.split(',') })
		}

		return res.status(500)
			.end()
	}
})

router.put('/:id', async (req, res) => {
	try {
		let entity = req.body

		if (!entity.id) {
			entity.id = req.params.id
		}

		await event.edit(req.body, req.user)

		return res.status(204)
			.end()
	} 
	catch (e) {
		if (e instanceof errors.BadRequestError) {
			return res.status(401)
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
		await event.delete(req.params.id, req.user)

		return res.status(204)
			.end()
	} 
	catch (e) {
		console.log('Error deleting event', e)
		if (e instanceof errors.BadRequestError) {
			return res.status(401)
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
