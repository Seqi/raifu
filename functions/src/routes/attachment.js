let express = require('express')
let router = express.Router()

let baseEntity = require('../data/base-entity')
let entities = require('../data/database/entities')
let errors = require('../utils/errors')

router.get('/', async (req, res) => {
	try {
		let items = await baseEntity(entities().attachment)
			.getAll(req.user)

		console.log(`[${req.user.uid}]: Successfuly retrieved ${items.length} attachments`)

		return res.json(items)
	} 
	catch (e) {
		console.error(`[${req.user.uid}]: Error retrieving attachments`, e)
		res.status(500)
			.end()
	}
})

router.post('/', async (req, res) => {
	try {		
		let item = await baseEntity(entities().attachment)
			.add(req.body, req.user)
			
		console.log(`[${req.user.uid}]: Added attachment ${JSON.stringify(item)}`)

		return res.json(item)
	} 
	catch (e) {
		if (e instanceof errors.BadRequestError) {
			console.warn(`[${req.user.uid}]: Bad request when creating attachment ${e.message}`)
			return res.status(400)
				.json({ errors: e.message.split(',') })
		}

		console.error(`[${req.user.uid}]: Error adding attachment`, e)
		return res.status(500)
			.end()
	}
})

router.delete('/:id', async (req, res) => {
	try {
		let item = await baseEntity(entities().attachment)
			.delete(req.params.id, req.user)

		if (item === 0) {
			return res.status(404)
				.end()
		}
		
		console.log(`[${req.user.uid}]: Deleted attachment ${req.params.id}`)

		return res.json(item)
	} 
	catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Attempted to delete attachment that does not exist (${req.params.id})`)
			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error deleting attachment`, e)
		return res.status(500)
			.end()
	}
})

module.exports = router