let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutGear = require('../data/loadout-gear')
let errors = require('../utils/errors')

router.post('/:gearId', async (req, res) => {
	let loadoutId = req.params.loadoutId
	let gearId = req.params.gearId

	if (!gearId) {
		return res.status(400)
			.send('Gear id is required')
	}

	if (!loadoutId) {
		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		let result = await loadoutGear.add(gearId, loadoutId, req.user)

		console.log(`[${req.user.uid}]: Added loadout gear. LoadoutId: ${loadoutId}. GearId: ${gearId}`)

		return res.json(result)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Could not find resources to add loadout gear (loadoutId: ${loadoutId} gearId: ${gearId})`, e)
			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error creating loadout gear`, e)
		return res.status(500)
			.end()
	}
})

router.delete('/:gearId', async (req, res) => {
	let loadoutId = req.params.loadoutId
	let gearId = req.params.gearId

	if (!gearId) {
		return res.status(400)
			.send('Gear id is required')
	}

	if (!loadoutId) {
		return res.status(400)
			.send('Loadout id is required')
	}
	
	try {
		await loadoutGear.delete(gearId, loadoutId, req.user)

		console.log(`[${req.user.uid}]: Deleted loadout gear. LoadoutId: ${loadoutId}. GearId: ${gearId}`)

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Could not find resources to delete loadout gear (loadoutId: ${loadoutId} gearId: ${gearId})`, e)
			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error deleting loadout gear`, e)
		return res.status(500)
			.end()
	}
})

module.exports = router