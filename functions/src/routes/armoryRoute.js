const { logger } = require('firebase-functions')
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

	router.get('/', async (req, res, next) => {
		try {
			logger.info(`Retrieving ${tableName}s`, {
				userId: req.user.uid,
			})

			let items = await baseEntity(entity)
				.getAll(req.user)

			logger.info(`Successfuly retrieved ${items.length} ${tableName}s`, {
				userId: req.user.uid,
				event: `${entity.toUpperCase()}_VIEWED`,
			})

			return res.json(items)
		} catch (e) {
			logger.error(`Failed to retrieve ${tableName}s.`, { userId: req.user.uid })
			next(e)
		}
	})

	router.post('/', async (req, res, next) => {
		try {
			logger.info(`Creating ${tableName}.`, { userId: req.user.uid, item: req.body })

			let item = await baseEntity(entity)
				.add(req.body, req.user)

			logger.info(`Successfully created ${tableName}.`, {
				userId: req.user.uid,
				itemId: item.id,
				event: `${entity.toUpperCase()}_CREATED`,
				item,
			})

			return res.json(item)
		} catch (e) {
			if (e instanceof errors.BadRequestError) {
				logger.warn(`Bad request when creating ${tableName} ${e.message}`, {
					userId: req.user.uid,
					item: req.body,
					failure: e.message,
				})

				return res.status(400)
					.json({ errors: e.message.split(',') })
			} else {
				logger.error(`An error occurred adding ${tableName}`, {
					userId: req.user.uid,
					item: req.body,
				})

				next(e)
			}
		}
	})

	router.delete('/:id', async (req, res, next) => {
		try {
			let item = await baseEntity(entity)
				.delete(req.params.id, req.user)

			if (item === 0) {
				logger.warn(`Attempted to delete a ${entity} that did not exist.`, {
					userId: req.user.uid,
					itemId: req.params.id,
					event: `${entity.toUpperCase()}_REMOVED`,
				})

				return res.status(404)
					.end()
			}

			logger.info(`Deleted ${tableName} ${req.params.id}`, {
				userId: req.user.uid,
				itemId: req.params.id,
			})

			return res.json(item)
		} catch (e) {
			logger.error(`Error deleting ${tableName}`, {
				userId: req.user.uid,
				itemId: req.params.id,
			})

			next(e)
		}
	})

	return router
}

module.exports = createArmoryRoute
