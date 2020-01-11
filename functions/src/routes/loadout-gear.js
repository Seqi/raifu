let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutGear = require('../data/loadout-gear')
let errors = require('../utils/errors')

router.post('/:gearId', async (req, res) => {
	try {
		let loadoutId = req.params.loadoutId
		let gearId = req.params.gearId

		let result = await loadoutGear.add(gearId, loadoutId, req.user)

		console.log(`[${req.user.uid}]: Added loadout gear. LoadoutId: ${loadoutId}. GearId: ${gearId}`)

		return res.json(result)
	} catch (e) {
		console.log('Error adding loadout gear', e)

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

router.delete('/:gearId', async (req, res) => {
	try {
		let loadoutId = req.params.loadoutId
		let gearId = req.params.gearId

		await loadoutGear.delete(gearId, loadoutId, req.user)

		console.log(`[${req.user.uid}]: Deleted loadout gear. LoadoutId: ${loadoutId}. GearId: ${gearId}`)

		return res.status(204)
			.end()
	} catch (e) {
		console.log('Error removing loadout gear', e)

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