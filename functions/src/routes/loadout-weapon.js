let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutWeaponAttachmentRoutes = require('./loadout-weapon-attachment')
let loadoutWeapon = require('../data/loadout-weapon')
let errors = require('../utils/errors')

router.post('/:weaponId', async (req, res) => {
	try {
		let weaponId = req.params.weaponId
		let loadoutId = req.params.loadoutId

		let result = await loadoutWeapon.add(weaponId, loadoutId, req.user)

		console.log(`[${req.user.uid}]: Added loadout weapon. LoadoutId: ${loadoutId}. WeaponId: ${weaponId}`)

		return res.json(result)
	} catch (e) {
		console.log('Error adding loadout weapon', e)

		if (e instanceof errors.BadRequestError) {
			return res.status(400)
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
		let weaponId = req.params.weaponId
		let loadoutId = req.params.loadoutId

		await loadoutWeapon.delete(weaponId, loadoutId, req.user)

		console.log(`[${req.user.uid}]: Removed loadout weapon. LoadoutId: ${loadoutId}. WeaponId: ${weaponId}`)

		return res.status(204)
			.end()
	} catch (e) {
		console.log('Error removing loadout weapon', e)

		if (e instanceof errors.BadRequestError) {
			return res.status(400)
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