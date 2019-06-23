let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutGear = require('../data/loadout-gear')
let errors = require('../utils/errors')

router.post('/:gearId', async (req, res) => {
	try {
		let result = await loadoutGear.add(req.params.gearId, req.params.loadoutId, req.user)

		return res.json(result)
	} catch (e) {
		console.log('Error adding loadout gear', e)

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

router.delete('/:gearId', async (req, res) => {
	try {
		await loadoutGear.delete(req.params.gearId, req.params.loadoutId, req.user)

		return res.status(204)
			.end()
	} catch (e) {
		console.log('Error removing loadout gear', e)

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