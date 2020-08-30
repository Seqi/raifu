let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutWeaponAttachmentRoutes = require('./loadout-weapon-attachment')
let loadoutWeapon = require('../data/loadout-weapon')
let errors = require('../utils/errors')

router.post('/:weaponId', async (req, res) => {
	let weaponId = req.params.weaponId
	let loadoutId = req.params.loadoutId

	if (!weaponId) {
		return res.status(400).send('Weapon id is required')
	}

	if (!loadoutId) {
		return res.status(400).send('Loadout id is required')
	}

	try {
		let result = await loadoutWeapon.add(weaponId, loadoutId, req.user)

		console.log(`[${req.user.uid}]: Added loadout weapon. LoadoutId: ${loadoutId}. WeaponId: ${weaponId}`)

		return res.json(result)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(
				`[${req.user.uid}]: Could not find resources to add loadout weapon (loadoutId: ${loadoutId} weaponId: ${weaponId})`,
				e
			)
			return res.status(404).end()
		}

		console.error(`[${req.user.uid}]: Error creating loadout weapon`, e)
		return res.status(500).end()
	}
})

router.delete('/:weaponId', async (req, res) => {
	let weaponId = req.params.weaponId
	let loadoutId = req.params.loadoutId

	if (!weaponId) {
		return res.status(400).send('Weapon id is required')
	}

	if (!loadoutId) {
		return res.status(400).send('Loadout id is required')
	}

	try {
		await loadoutWeapon.delete(weaponId, loadoutId, req.user)

		console.log(`[${req.user.uid}]: Removed loadout weapon. LoadoutId: ${loadoutId}. WeaponId: ${weaponId}`)

		return res.status(204).end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(
				`[${req.user.uid}]: Could not find resources to delete loadout weapon (loadoutId: ${loadoutId} weaponId: ${weaponId})`,
				e
			)
			return res.status(404).end()
		}

		console.error(`[${req.user.uid}]: Error deleting loadout weapon`, e)
		return res.status(500).end()
	}
})

router.use('/:weaponId/attachments', loadoutWeaponAttachmentRoutes)

module.exports = router
