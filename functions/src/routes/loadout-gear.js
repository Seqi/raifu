const { logger } = require('firebase-functions')
let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutGear = require('../data/loadout-gear')
let errors = require('../utils/errors')

router.post('/:gearId', async (req, res, next) => {
	let loadoutId = req.params.loadoutId
	let gearId = req.params.gearId

	logger.info('Adding gear to loadout.', {
		userId: req.user.uid,
		gearId,
		loadoutId,
	})

	if (!gearId) {
		logger.warn('No gear id was provided.', {
			userId: req.user.uid,
			gearId,
			loadoutId,
		})

		return res.status(400)
			.send('Gear id is required')
	}

	if (!loadoutId) {
		logger.warn('No loadout id was provided.', {
			userId: req.user.uid,
			gearId,
			loadoutId,
		})

		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		let result = await loadoutGear.add(gearId, loadoutId, req.user)

		logger.info('Successfully added gear to loadout.', {
			userId: req.user.uid,
			gearId,
			loadoutId,
			event: 'LOADOUT_ADD_GEAR',
		})

		return res.json(result)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Loadout or gear does not exist.', {
				userId: req.user.uid,
				gearId,
				loadoutId,
			})

			return res.status(404)
				.end()
		}

		logger.error('Error adding gear to loadout.', {
			userId: req.user.uid,
			gearId,
			loadoutId,
		})

		next(e)
	}
})

router.delete('/:gearId', async (req, res, next) => {
	let loadoutId = req.params.loadoutId
	let gearId = req.params.gearId

	logger.info('Removing gear from loadout.', {
		userId: req.user.uid,
		gearId,
		loadoutId,
	})

	if (!gearId) {
		logger.warn('No gear id was provided.', {
			userId: req.user.uid,
			gearId,
			loadoutId,
		})

		return res.status(400)
			.send('Gear id is required')
	}

	if (!loadoutId) {
		logger.warn('No loadout id was provided.', {
			userId: req.user.uid,
			gearId,
			loadoutId,
		})

		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		await loadoutGear.delete(gearId, loadoutId, req.user)

		logger.info('Successfully removed gear from loadout.', {
			userId: req.user.uid,
			gearId,
			loadoutId,
			event: 'LOADOUT_REMOVE_GEAR',
		})

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Loadout or gear does not exist.', {
				userId: req.user.uid,
				gearId,
				loadoutId,
			})

			return res.status(404)
				.end()
		}

		logger.error('Error removing gear from loadout.', {
			userId: req.user.uid,
			gearId,
			loadoutId,
		})

		next(e)
	}
})

module.exports = router
