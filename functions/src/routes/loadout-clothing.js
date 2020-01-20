let express = require('express')
let router = express.Router({ mergeParams: true })

let loadoutClothing = require('../data/loadout-clothing')
let errors = require('../utils/errors')

router.post('/:clothingId', async (req, res) => {
	let loadoutId = req.params.loadoutId
	let clothingId = req.params.clothingId

	if (!clothingId) {
		return res.status(400)
			.send('Clothing id is required')
	}

	if (!loadoutId) {
		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		let result = await loadoutClothing.add(clothingId, loadoutId, req.user)

		console.log(`[${req.user.uid}]: Added loadout clothing. LoadoutId: ${loadoutId}. ClothingId: ${clothingId}`)
		
		return res.json(result)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Could not find resources to add loadout clothing (loadoutId: ${loadoutId} clothingId: ${clothingId})`, e)
			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error creating loadout clothing`, e)
		return res.status(500)
			.end()
	}
})

router.delete('/:clothingId', async (req, res) => {
	let loadoutId = req.params.loadoutId
	let clothingId = req.params.clothingId

	if (!clothingId) {
		return res.status(400)
			.send('Clothing id is required')
	}

	if (!loadoutId) {
		return res.status(400)
			.send('Loadout id is required')
	}

	try {
		await loadoutClothing.delete(clothingId, loadoutId, req.user)

		console.log(`[${req.user.uid}]: Deleted loadout clothing. LoadoutId: ${loadoutId}. ClothingId: ${clothingId}`)

		return res.status(204)
			.end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Could not find resources to delete loadout clothing (loadoutId: ${loadoutId} clothingId: ${clothingId})`, e)
			return res.status(404)
				.end()
		}

		console.error(`[${req.user.uid}]: Error deleting loadout clothing`, e)
		return res.status(500)
			.end()
	}
})

module.exports = router