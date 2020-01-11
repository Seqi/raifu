let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutWeaponAttachment = require('../data/loadout-weapon-attachment')
let errors = require('../utils/errors')

router.post('/:attachmentId', async (req, res) => {
	try {
		let weaponId = req.params.weaponId
		let attachmentId = req.params.attachmentId
		let loadoutId = req.params.loadoutId

		let result = await loadoutWeaponAttachment.add(
			weaponId,
			attachmentId,
			loadoutId,
			req.user)
			
		console.log(`Adding loadout weapon attachment. 
			LoadoutId: ${loadoutId}. 
			WeaponId: ${weaponId}
			AttachmentId: ${attachmentId}`)

		return res.json(result)
	} catch (e) {
		console.log('Error adding loadout weapon attachment', e)

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

router.delete('/:attachmentId', async (req, res) => {
	try {
		let weaponId = req.params.weaponId
		let attachmentId = req.params.attachmentId
		let loadoutId = req.params.loadoutId

		await loadoutWeaponAttachment.delete(
			weaponId,
			attachmentId,
			loadoutId,
			req.user)
			
		console.log(`Removed loadout weapon attachment. 
			LoadoutId: ${loadoutId}. 
			WeaponId: ${weaponId}
			AttachmentId: ${attachmentId}`)

		return res.status(204)
			.end()
	} catch (e) {
		console.log('Error removing loadout weapon attachment', e)

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

module.exports = router