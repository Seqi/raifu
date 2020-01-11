let express = require('express')
let router = express.Router()

let baseEntity = require('../data/base-entity')
let entities = require('../data/database/entities')
let errors = require('../utils/errors')

router.get('/', async (req, res) => {
	try {
		let items = await baseEntity(entities().clothing, 'clothing')
			.getAll(req.user)
			
		console.log(`[${req.user.uid}]: Successfuly retrieved ${items.length} clothing`)

		return res.json(items)
	} 
	catch (e) {
		res.status(500)
			.end()
	}
})

router.post('/', async (req, res) => {
	try {		
		let item = await baseEntity(entities().clothing, 'clothing')
			.add(req.body, req.user)

			
		console.log(`[${req.user.uid}]: Added clothing ${JSON.stringify(item)}`)

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

router.delete('/:id', async (req, res) => {
	try {
		let item = await baseEntity(entities().clothing, 'clothing')
			.delete(req.params.id, req.user)

		if (item === 0) {
			return res.status(404)
				.end()
		}
		
		console.log(`[${req.user.uid}]: Deleted clothing ${req.params.id}`)

		return res.json(item)
	} 
	catch (e) {
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