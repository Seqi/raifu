let express = require('express')

let errors = require('../utils/errors')
let baseEntity = require('../data/base-entity')

let createArmoryRoute = (entity) => {
	let router = express.Router()

	// Singularise the model
	let tableName = entity.tableName
	if (tableName[tableName.length - 1] === 's') {
		tableName = tableName.slice(0, tableName.length - 1)
	}

	router.get('/', async (req, res) => {
		try {
			let items = await baseEntity(entity).getAll(req.user)

			console.log(`[${req.user.uid}]: Successfuly retrieved ${items.length} ${tableName}s`)

			return res.json(items)
		} catch (e) {
			console.error(`[${req.user.uid}]: Error retrieving ${tableName}s`, e)
			res.status(500).end()
		}
	})

	router.post('/', async (req, res) => {
		try {
			let item = await baseEntity(entity).add(req.body, req.user)

			console.log(`[${req.user.uid}]: Added ${tableName} ${JSON.stringify(item)}`)

			return res.json(item)
		} catch (e) {
			if (e instanceof errors.BadRequestError) {
				console.warn(`[${req.user.uid}]: Bad request when creating ${tableName} ${e.message}`)
				return res.status(400).json({ errors: e.message.split(',') })
			}

			console.error(`[${req.user.uid}]: Error adding ${tableName}`, e)
			return res.status(500).end()
		}
	})

	router.delete('/:id', async (req, res) => {
		try {
			let item = await baseEntity(entity).delete(req.params.id, req.user)

			if (item === 0) {
				return res.status(404).end()
			}

			console.log(`[${req.user.uid}]: Deleted ${tableName} ${req.params.id}`)

			return res.json(item)
		} catch (e) {
			if (e instanceof errors.NotFoundError) {
				console.warn(
					`[${req.user.uid}]: Attempted to delete ${tableName} that does not exist (${req.params.id})`
				)
				return res.status(404).end()
			}

			console.error(`[${req.user.uid}]: Error deleting ${tableName}`, e)
			return res.status(500).end()
		}
	})

	return router
}

module.exports = createArmoryRoute
