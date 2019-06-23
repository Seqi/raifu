let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutWeaponAttachmentRoutes = require('./loadout-weapon-attachment')
let loadoutWeapon = require('../data/loadout-weapon')
let errors = require('../utils/errors')

router.post('/:weaponId', async (req, res) => {
	try {
		let result = await loadoutWeapon.add(req.params.weaponId, req.params.loadoutId, req.user)

		return res.json(result)
	} catch (e) {
		console.log('Error adding loadout weapon', e)

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

router.delete('/:weaponId', async (req, res) => {
	try {
		await loadoutWeapon.delete(req.params.weaponId, req.params.loadoutId, req.user)

		return res.status(204)
			.end()
	} catch (e) {
		console.log('Error removing loadout weapon', e)

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

router.use('/:weaponId/attachments', loadoutWeaponAttachmentRoutes)

module.exports = router