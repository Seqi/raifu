let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutWeaponAttachment = require('../data/loadout-weapon-attachment')
let errors = require('../utils/errors')

router.post('/:attachmentId', async (req, res) => {
	try {
		let result = await loadoutWeaponAttachment.add(
			req.params.weaponId,
			req.params.attachmentId,
			req.params.loadoutId, 
			req.user)

		return res.json(result)
	} catch (e) {
		console.log('Error adding loadout weapon attachment', e)

		if (e instanceof errors.BadRequestError) {
			return res.status(401)
				.json({ errors: e.message || e })
		}

		if (e instanceof errors.NotFoundError) {
			return res.status(404)
				.end()
		}

		return res.status(500)
			.end()
	}
})

router.delete('/:attachmentId', async (req, res) => {
	try {
		await loadoutWeaponAttachment.delete(
			req.params.weaponId,
			req.params.attachmentId,
			req.params.loadoutId,
			req.user)

		return res.status(204)
			.end()
	} catch (e) {
		console.log('Error removing loadout weapon attachment', e)

		if (e instanceof errors.BadRequestError) {
			return res.status(401)
				.json({ errors: e.message || e })
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