let express = require('express')
let router = express.Router()

let baseEntity = require('../data/base-entity')
let entities = require('../data/database/entities')
let errors = require('../utils/errors')

router.get('/', async (req, res) => {
	try {
		let items = await baseEntity(entities().weapon)
			.getAll(req.user)
			
		console.log(`[${req.user.uid}]: Retrieved ${items.length} weapons`)

		return res.json(items)
	} 
	catch (e) {
		console.error(`[${req.user.uid}]: Error retrieving weapons`, e)
		res.status(500)
			.end()
	}
})

router.post('/', async (req, res) => {
	try {		
		let item = await baseEntity(entities().weapon)
			.add(req.body, req.user)

		console.log(`[${req.user.uid}]: Added weapon ${JSON.stringify(item)}`)

		return res.json(item)
	} 
	catch (e) {
		if (e instanceof errors.BadRequestError) {
			console.warn(`[${req.user.uid}]: Bad request when creating weapon ${e.message}`)
			return res.status(400)
				.json({ errors: e.message.split(',') })
		}

		console.error(`[${req.user.uid}]: Error adding weapon`, e)
		return res.status(500)
			.end()
	}
})

router.delete('/:id', async (req, res) => {
	try {
		let item = await baseEntity(entities().weapon)
			.delete(req.params.id, req.user)

		if (item === 0) {
			return res.status(404)
				.end()
		}

		console.log(`[${req.user.uid}]: Deleted weapon ${req.params.id}`)

		return res.json(item)
	} 
	catch (e) {		
		console.warn(`[${req.user.uid}]: Attempted to delete weapon that does not exist (${req.params.id})`)
		if (e instanceof errors.NotFoundError) {
			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error deleting weapon`, e)
		return res.status(500)
			.end()
	}
})

module.exports = router