let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutClothing = require('../data/loadout-clothing')
let errors = require('../utils/errors')

router.post('/:clothingId', async (req, res) => {
	try {
		let loadoutId = req.params.loadoutId
		let clothingId = req.params.clothingId

		let result = await loadoutClothing.add(clothingId, loadoutId, req.user)

		console.log(`[${req.user.uid}]: Added loadout clothing. LoadoutId: ${loadoutId}. ClothingId: ${clothingId}`)
		
		return res.json(result)
	} catch (e) {
		console.log('Error adding loadout clothing', e)

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

router.delete('/:clothingId', async (req, res) => {
	try {
		let loadoutId = req.params.loadoutId
		let clothingId = req.params.clothingId

		await loadoutClothing.delete(clothingId, loadoutId, req.user)

		console.log(`[${req.user.uid}]: Deleted loadout clothing. LoadoutId: ${loadoutId}. ClothingId: ${clothingId}`)

		return res.status(204)
			.end()
	} catch (e) {
		console.log('Error removing loadout clothing', e)

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