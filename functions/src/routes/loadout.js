const { logger } = require('firebase-functions')
let express = require('express')
let router = express.Router()

let authMiddleware = require('../middleware/firebase-auth-middleware')

let loadoutWeaponRoutes = require('./loadout-weapon')
let loadoutGearRoutes = require('./loadout-gear')
let loadoutClothingRoutes = require('./loadout-clothing')

let loadout = require('../data/loadout')
let errors = require('../utils/errors')

router.get('/', authMiddleware(), async (req, res, next) => {
	try {
		logger.info('Retrieving loadout list', {
			userId: req.user.uid,
		})

		let items = await loadout.getAll(req.user)

		logger.info(`Successfuly retrieved ${items.length} loadouts`, {
			userId: req.user.uid,
			itemCount: items.length,
			event: 'LOADOUT_LIST_VIEWED',
		})

		return res.json(items)
	} catch (e) {
		logger.error('Failed to retrieve loadout list.', { userId: req.user.uid })
		next(e)
	}
})

router.get('/:id', authMiddleware(false), async (req, res, next) => {
	let loadoutId = req.params.id
	logger.info('Retrieving loadout.', {
		userId: req.user.uid,
		loadoutId,
		anonymous: !!req.user,
	})

	try {
		let item = await loadout.getById(loadoutId, req.user)

		logger.info('Successfuly retrieved loadout', {
			userId: req.user?.uid,
			loadoutId,
			anonymous: !!req.user,
			event: 'LOADOUT_VIEWED',
		})

		return res.json(item)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Could not find loadout.', {
				userId: req.user.uid,
				loadoutId,
				anonymous: !!req.user,
			})

			return res.status(404)
				.end()
		}

		logger.warn('Error retrieving loadout.', {
			userId: req.user.uid,
			loadoutId,
			anonymous: !!req.user,
		})

		next(e)
	}
})

router.post('/', authMiddleware(), async (req, res, next) => {
	try {
		logger.info('Creating loadout.', { userId: req.user.uid, item: req.body })

		let item = await loadout.add(req.body, req.user)

		logger.info('Loadout created successfully.', {
			userId: req.user.uid,
			loadoutId: item.id,
			item: item,
			event: 'LOADOUT_CREATED',
		})

		return res.json(item)
	} catch (e) {
		if (e instanceof errors.BadRequestError) {
			logger.warn('Bad request when creating loadout.', {
				userId: req.user.uid,
				failure: e.message,
				item: req.body,
			})

			return res.status(400)
				.json({ errors: e.message.split(',') })
		}

		logger.error('Error creating loadout', {
			userId: req.user.uid,
			failure: e.message,
			item: req.body,
		})

		next(e)
	}
})

router.put('/:id', authMiddleware(), async (req, res, next) => {
	let loadoutId = req.params.id

	logger.info('Updating loadout.', { userId: req.user.uid, loadoutId, item: req.body })

	if (!loadoutId) {
		logger.warn('No loadout id was provided.', { userId: req.user.uid, loadoutId })

		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		let item = await loadout.edit(loadoutId, req.body, req.user)

		logger.info('Updated loadout', {
			userId: req.user.uid,
			loadoutId,
			item: item,
			event: 'LOADOUT_UPDATED',
		})

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.BadRequestError) {
			logger.warn('Bad request when updating loadout.', {
				userId: req.user.uid,
				failure: e.message,
				item: req.body,
			})
			return res.status(400)
				.json({ errors: e })
		}

		if (e instanceof errors.NotFoundError) {
			logger.warn('Could not find loadout.', { userId: req.user.uid, loadoutId })

			return res.status(404)
				.end()
		}

		logger.error('Error updating loadout.', {
			userId: req.user.uid,
			loadoutId,
			item: req.body,
		})

		next(e)
	}
})

router.post('/:id/share', authMiddleware(), async (req, res) => {
	let loadoutId = req.params.id
	logger.info('Sharing loadout', { userId: req.user.uid, loadoutId, item: req.body })

	if (!loadoutId) {
		logger.warn('No loadout id was provided.', { userId: req.user.uid, loadoutId })

		return res.status(400)
			.send('Loadout id is required')
	}

	let isShared = req.body.shared

	if (isShared == null) {
		logger.warn('Shared was not provided.', {
			userId: req.user.uid,
			loadoutId,
			item: req.body,
		})

		return res.status(400)
			.send('\'Shared\' property is required')
	}

	try {
		let item = await loadout.share(loadoutId, isShared, req.user)

		logger.info(`Setting loadout is shared to ${req.body.shared}.`, {
			userId: req.user.uid,
			loadoutId,
			shared: req.body.shared,
		})

		return res.json(item)
	} catch (e) {
		if (e instanceof errors.BadRequestError) {
			logger.warn('Bad request when updating loadout.', {
				userId: req.user.uid,
				failure: e.message,
				item: req.body,
			})
			return res.status(400)
				.json({ errors: e })
		}

		if (e instanceof errors.NotFoundError) {
			logger.warn('Could not find loadout.', { userId: req.user.uid, loadoutId })

			return res.status(404)
				.end()
		}

		logger.error('Error updating loadout publicity.', {
			userId: req.user.uid,
			loadoutId,
			item: req.body,
		})

		return res.status(500)
			.end()
	}
})

router.delete('/:id', authMiddleware(), async (req, res, next) => {
	const loadoutId = req.params.id
	logger.info('Deleting loadout', { userId: req.user.uid, loadoutId })

	try {
		if (!loadoutId) {
			logger.warn('No loadout id was provided.', { userId: req.user.uid, loadoutId })

			return res.status(400)
				.send('Loadout id is required')
		}

		await loadout.delete(loadoutId, req.user)

		logger.info('Successfully deleted loadout', {
			userId: req.user.uid,
			loadoutId,
			event: 'LOADOUT_DELETED',
		})

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(
				logger.warn('Could not find loadout.', { userId: req.user.uid, loadoutId })
			)
			return res.status(404)
				.end()
		}

		logger.error('Error deleting loadout.', { userId: req.user.uid, loadoutId })

		next(e)
	}
})

router.use('/:loadoutId/weapons', authMiddleware(), loadoutWeaponRoutes)
router.use('/:loadoutId/gear', authMiddleware(), loadoutGearRoutes)
router.use('/:loadoutId/clothing', authMiddleware(), loadoutClothingRoutes)

module.exports = router
