let express = require('express')
let router = express.Router()

let errors = require('../utils/errors')
let baseEntity = require('../data/base-entity')
let { Clothing } = require('../data/database/entities')

router.get('/', async (req, res) => {
	try {
		let items = await baseEntity(Clothing)
			.getAll(req.user)
			
		console.log(`[${req.user.uid}]: Successfuly retrieved ${items.length} clothing`)

		return res.json(items)
	} 
	catch (e) {
		console.error(`[${req.user.uid}]: Error retrieving clothing`, e)
		res.status(500)
			.end()
	}
})

router.post('/', async (req, res) => {
	try {		
		let item = await baseEntity(Clothing)
			.add(req.body, req.user)
			
		console.log(`[${req.user.uid}]: Added clothing ${JSON.stringify(item)}`)

		return res.json(item)
	} 
	catch (e) {
		if (e instanceof errors.BadRequestError) {
			console.warn(`[${req.user.uid}]: Bad request when creating clothing ${e.message}`)
			return res.status(400)
				.json({ errors: e.message.split(',') })
		}

		console.error(`[${req.user.uid}]: Error adding clothing`, e)
		return res.status(500)
			.end()
	}
})

router.delete('/:id', async (req, res) => {
	try {
		let item = await baseEntity(Clothing)
			.delete(req.params.id, req.user)

		if (item === 0) {
			return res.status(404)
				.end()
		}
		
		console.log(`[${req.user.uid}]: Deleted clothing ${req.params.id}`)

		return res.json(item)
	} 
	catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Attempted to delete clothing that does not exist (${req.params.id})`)
			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error deleting clothing`, e)
		return res.status(500)
			.end()
	}
})

module.exports = router