let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutWeaponAttachment = require('../data/loadout-weapon-attachment')
let errors = require('../utils/errors')

router.post('/:attachmentId', async (req, res) => {
	let weaponId = req.params.weaponId
	let attachmentId = req.params.attachmentId
	let loadoutId = req.params.loadoutId
	
	if (!weaponId) {
		return res.status(400)
			.send('Weapon id is required')
	}

	if (!attachmentId) {
		return res.status(400)
			.send('Attachment id is required')
	}

	if (!loadoutId) {
		return res.status(400)
			.send('Loadout id is required')
	}

	try {
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
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Could not find resources to add loadout weapon attachment ` +
				`(loadoutId: ${loadoutId} weaponId: ${weaponId} attachmentId: ${attachmentId})`, e)

			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error creating loadout weapon attachment`, e)
		return res.status(500)
			.end()
	}
})

router.delete('/:attachmentId', async (req, res) => {
	let weaponId = req.params.weaponId
	let attachmentId = req.params.attachmentId
	let loadoutId = req.params.loadoutId
	
	if (!weaponId) {
		return res.status(400)
			.send('Weapon id is required')
	}

	if (!attachmentId) {
		return res.status(400)
			.send('Attachment id is required')
	}

	if (!loadoutId) {
		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		await loadoutWeaponAttachment.delete(
			weaponId,
			attachmentId,
			loadoutId,
			req.user)
			
		console.log('Removed loadout weapon attachment ' +
			`LoadoutId: ${loadoutId}. ` +
			`WeaponId: ${weaponId} ` +
			`AttachmentId: ${attachmentId}`)

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Could not find resources to remove loadout weapon attachment ` +
				`(loadoutId: ${loadoutId} weaponId: ${weaponId} attachmentId: ${attachmentId})`, e)

			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error removing loadout weapon attachment`, e)
		return res.status(500)
			.end()
	}
})

module.exports = router