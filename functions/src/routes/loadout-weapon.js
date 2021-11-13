const { logger } = require('firebase-functions')
let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutWeaponAttachmentRoutes = require('./loadout-weapon-attachment')
let loadoutWeapon = require('../data/loadout-weapon')
let errors = require('../utils/errors')

router.post('/:weaponId', async (req, res, next) => {
	let weaponId = req.params.weaponId
	let loadoutId = req.params.loadoutId

	logger.info('Adding weapon to loadout.', {
		userId: req.user.uid,
		weaponId,
		loadoutId,
	})

	if (!weaponId) {
		logger.warn('No weapon id was provided.', {
			userId: req.user.uid,
			weaponId,
			loadoutId,
		})

		return res.status(400)
			.send('Weapon id is required')
	}

	if (!loadoutId) {
		logger.warn('No loadout id was provided.', {
			userId: req.user.uid,
			weaponId,
			loadoutId,
		})

		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		let result = await loadoutWeapon.add(weaponId, loadoutId, req.user)

		logger.info('Successfully added weapon to loadout.', {
			userId: req.user.uid,
			weaponId,
			loadoutId,
			event: 'LOADOUT_ADD_WEAPON',
		})

		return res.json(result)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Loadout or weapon does not exist.', {
				userId: req.user.uid,
				weaponId,
				loadoutId,
			})

			return res.status(404)
				.end()
		}

		logger.error('Error adding weapon to loadout.', {
			userId: req.user.uid,
			weaponId,
			loadoutId,
		})

		next(e)
	}
})

router.delete('/:weaponId', async (req, res, next) => {
	let weaponId = req.params.weaponId
	let loadoutId = req.params.loadoutId

	logger.info('Removing weapon from loadout.', {
		userId: req.user.uid,
		weaponId,
		loadoutId,
	})

	if (!weaponId) {
		logger.warn('No weapon id was provided.', {
			userId: req.user.uid,
			weaponId,
			loadoutId,
		})

		return res.status(400)
			.send('Weapon id is required')
	}

	if (!loadoutId) {
		logger.warn('No loadout id was provided.', {
			userId: req.user.uid,
			weaponId,
			loadoutId,
		})

		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		await loadoutWeapon.delete(weaponId, loadoutId, req.user)

		logger.info('Successfully removed weapon from loadout.', {
			userId: req.user.uid,
			weaponId,
			loadoutId,
			event: 'LOADOUT_REMOVE_WEAPON',
		})

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Loadout or weapon does not exist.', {
				userId: req.user.uid,
				weaponId,
				loadoutId,
			})

			return res.status(404)
				.end()
		}

		logger.error('Error removing weapon from loadout.', {
			userId: req.user.uid,
			weaponId,
			loadoutId,
		})

		next(e)
	}
})

router.use('/:weaponId/attachments', loadoutWeaponAttachmentRoutes)

module.exports = router
