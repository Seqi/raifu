const { logger } = require('firebase-functions')
let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutWeaponAttachment = require('../data/loadout-weapon-attachment')
let errors = require('../utils/errors')

router.post('/:attachmentId', async (req, res, next) => {
	let weaponId = req.params.weaponId
	let attachmentId = req.params.attachmentId
	let loadoutId = req.params.loadoutId

	logger.info('Adding attachment to loadout weapon.', {
		userId: req.user.uid,
		weaponId,
		attachmentId,
		loadoutId,
	})

	if (!weaponId) {
		logger.warn('No weapon id was provided.', {
			userId: req.user.uid,
			weaponId,
			attachmentId,
			loadoutId,
		})

		return res.status(400)
			.send('Weapon id is required')
	}

	if (!attachmentId) {
		logger.warn('No attachment id was provided.', {
			userId: req.user.uid,
			weaponId,
			attachmentId,
			loadoutId,
		})

		return res.status(400)
			.send('Attachment id is required')
	}

	if (!loadoutId) {
		logger.warn('No loadout id was provided.', {
			userId: req.user.uid,
			weaponId,
			attachmentId,
			loadoutId,
		})

		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		let result = await loadoutWeaponAttachment.add(
			weaponId,
			attachmentId,
			loadoutId,
			req.user
		)

		logger.info('Successfully added attachment to loadout weapon.', {
			userId: req.user.uid,
			weaponId,
			attachmentId,
			loadoutId,
			event: 'LOADOUT_ADD_WEAPON_ATTACHMENT',
		})

		return res.json(result)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Loadout, weapon, or attachment does not exist.', {
				userId: req.user.uid,
				weaponId,
				attachmentId,
				loadoutId,
			})

			return res.status(404)
				.end()
		}

		logger.warn('Error adding loadout weapon attachment.', {
			userId: req.user.uid,
			weaponId,
			attachmentId,
			loadoutId,
		})

		next(e)
	}
})

router.delete('/:attachmentId', async (req, res, next) => {
	let weaponId = req.params.weaponId
	let attachmentId = req.params.attachmentId
	let loadoutId = req.params.loadoutId

	logger.info('Removing attachment from loadout weapon.', {
		userId: req.user.uid,
		weaponId,
		attachmentId,
		loadoutId,
	})

	if (!weaponId) {
		logger.warn('No weapon id was provided.', {
			userId: req.user.uid,
			weaponId,
			attachmentId,
			loadoutId,
		})

		return res.status(400)
			.send('Weapon id is required')
	}

	if (!attachmentId) {
		logger.warn('No attachment id was provided.', {
			userId: req.user.uid,
			weaponId,
			attachmentId,
			loadoutId,
		})

		return res.status(400)
			.send('Attachment id is required')
	}

	if (!loadoutId) {
		logger.warn('No loadout id was provided.', {
			userId: req.user.uid,
			weaponId,
			attachmentId,
			loadoutId,
		})

		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		await loadoutWeaponAttachment.delete(weaponId, attachmentId, loadoutId, req.user)

		logger.info('Successfully removed attachment from loadout weapon.', {
			userId: req.user.uid,
			weaponId,
			attachmentId,
			loadoutId,
			event: 'LOADOUT_REMOVE_WEAPON_ATTACHMENT',
		})

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			logger.warn('Loadout or clothing does not exist.', {
				userId: req.user.uid,
				weaponId,
				attachmentId,
				loadoutId,
			})

			return res.status(404)
				.end()
		}

		logger.error('Error adding loadout weapon attachment.', {
			userId: req.user.uid,
			weaponId,
			attachmentId,
			loadoutId,
		})

		next(e)
	}
})

module.exports = router
