let express = require('express')
let router = express.Router()

let errors = require('../utils/errors')
let baseEntity = require('../data/base-entity')
let { Gear } = require('../data/database/entities')

router.get('/', async (req, res) => {
	try {
		let items = await baseEntity(Gear)
			.getAll(req.user)
			
		console.log(`[${req.user.uid}]: Successfuly retrieved ${items.length} gear`)

		return res.json(items)
	} 
	catch (e) {
		console.error(`[${req.user.uid}]: Error retrieving gear`, e)
		res.status(500)
			.end()
	}
})

router.post('/', async (req, res) => {
	try {		
		let item = await baseEntity(Gear)
			.add(req.body, req.user)
			
		console.log(`[${req.user.uid}]: Added gear ${JSON.stringify(item)}`)

		return res.json(item)
	} 
	catch (e) {
		if (e instanceof errors.BadRequestError) {
			console.warn(`[${req.user.uid}]: Bad request when creating gear ${e.message}`)
			return res.status(400)
				.json({ errors: e.message.split(',') })
		}

		console.error(`[${req.user.uid}]: Error adding gear`, e)
		return res.status(500)
			.end()
	}
})

router.delete('/:id', async (req, res) => {
	try {
		let item = await baseEntity(Gear)
			.delete(req.params.id, req.user)

		if (item === 0) {
			return res.status(404)
				.end()
		}

		console.log(`[${req.user.uid}]: Deleted gear ${req.params.id}`)

		return res.json(item)
	} 
	catch (e) {
		console.warn(`[${req.user.uid}]: Attempted to delete gear that does not exist (${req.params.id})`)
		if (e instanceof errors.NotFoundError) {
			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error deleting gear`, e)
		return res.status(500)
			.end()
	}
})

module.exports = router