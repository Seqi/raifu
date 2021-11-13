const { logger } = require('firebase-functions')
let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutClothing = require('../data/loadout-clothing')
let errors = require('../utils/errors')

router.post('/:clothingId', async (req, res, next) => {
	let loadoutId = req.params.loadoutId
	let clothingId = req.params.clothingId

	logger.info('Adding clothing to loadout.', {
		userId: req.user.uid,
		clothingId,
		loadoutId,
	})

	if (!clothingId) {
		logger.warn('No clothing id was provided.', {
			userId: req.user.uid,
			clothingId,
			loadoutId,
		})

		return res.status(400)
			.send('Clothing id is required')
	}

	if (!loadoutId) {
		logger.warn('No loadout id was provided.', {
			userId: req.user.uid,
			clothingId,
			loadoutId,
		})

		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		let result = await loadoutClothing.add(clothingId, loadoutId, req.user)

		logger.info('Successfully added clothing to loadout.', {
			userId: req.user.uid,
			clothingId,
			loadoutId,
			event: 'LOADOUT_ADD_CLOTHING',
		})

		return res.json(result)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Loadout or clothing does not exist.', {
				userId: req.user.uid,
				clothingId,
				loadoutId,
			})

			return res.status(404)
				.end()
		}

		logger.error('Error adding clothing to loadout.', {
			userId: req.user.uid,
			clothingId,
			loadoutId,
		})

		next(e)
	}
})

router.delete('/:clothingId', async (req, res, next) => {
	let loadoutId = req.params.loadoutId
	let clothingId = req.params.clothingId

	logger.info('Removing clothing from loadout.', {
		userId: req.user.uid,
		clothingId,
		loadoutId,
	})

	if (!clothingId) {
		logger.warn('No clothing id was provided.', {
			userId: req.user.uid,
			clothingId,
			loadoutId,
		})

		return res.status(400)
			.send('Clothing id is required')
	}

	if (!loadoutId) {
		logger.warn('No loadout id was provided.', {
			userId: req.user.uid,
			clothingId,
			loadoutId,
		})

		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		await loadoutClothing.delete(clothingId, loadoutId, req.user)

		logger.info('Successfully removed clothing from loadout.', {
			userId: req.user.uid,
			clothingId,
			loadoutId,
			event: 'LOADOUT_REMOVE_CLOTHING',
		})

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Loadout or clothing does not exist.', {
				userId: req.user.uid,
				clothingId,
				loadoutId,
			})

			return res.status(404)
				.end()
		}

		logger.error('Error removing clothing from loadout.', {
			userId: req.user.uid,
			clothingId,
			loadoutId,
		})

		next(e)
	}
})

module.exports = router
