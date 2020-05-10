let express = require('express')
let router = express.Router()

let authMiddleware = require('../middleware/firebase-auth-middleware')

let loadoutWeaponRoutes = require('./loadout-weapon')
let loadoutGearRoutes = require('./loadout-gear')
let loadoutClothingRoutes = require('./loadout-clothing')

let loadout = require('../data/loadout')
let errors = require('../utils/errors')

router.get('/', authMiddleware(), async (req, res) => {
	try {
		let items = await loadout.getAll(req.user)

		console.log(`[${req.user.uid}]: Retrieved ${items.length} loadouts`)

		return res.json(items)
	} catch (e) {
		console.error(`[${req.user.uid}]: Error retrieving loadouts`, e)
		res.status(500).end()
	}
})

router.get('/:id', authMiddleware(false), async (req, res) => {
	let loadoutId = req.params.id

	try {
		let item = await loadout.getById(loadoutId, req.user)

		console.log(`[${req.user ? req.user.uid : 'Anonymous'}]: Retrieved loadout ${JSON.stringify(item)}`)

		return res.json(item)
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user ? req.user.uid : 'Anonymous'}]: Could not find loadout with id ${loadoutId}`)
			return res.status(404).end()
		}

		console.error(`[${req.user ? req.user.uid : 'Anonymous'}]: Error retrieving loadout with id ${loadoutId}`, e)
		return res.status(500).end()
	}
})

router.post('/', authMiddleware(), async (req, res) => {
	try {
		let item = await loadout.add(req.body, req.user)

		console.log(`[${req.user.uid}]: Added loadout ${JSON.stringify(item)}`)

		return res.json(item)
	} catch (e) {
		if (e instanceof errors.BadRequestError) {
			console.warn(`[${req.user.uid}]: Bad request when creating loadout ${e.message}`)
			return res.status(400).json({ errors: e.message.split(',') })
		}

		console.error(`[${req.user.uid}]: Error adding loadout`, e)
		return res.status(500).end()
	}
})

router.put('/:id', authMiddleware(), async (req, res) => {
	let loadoutId = req.params.id

	if (!loadoutId) {
		return res.status(400).send('Loadout id is required')
	}

	try {
		let item = await loadout.edit(loadoutId, req.body, req.user)

		console.log(`[${req.user.uid}]: Updated loadout ${JSON.stringify(item)}`)

		return res.status(204).end()
	} catch (e) {
		if (e instanceof errors.BadRequestError) {
			console.warn(`[${req.user.uid}]: Bad request when updating loadout ${e.message}`)
			return res.status(400).json({ errors: e })
		}

		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Attempted to update loadout that does not exist (${loadoutId})`)
			return res.status(404).end()
		}

		console.error(`[${req.user.uid}]: Error updating loadout with id ${loadoutId}`, e)
		return res.status(500).end()
	}
})

router.post('/:id/share', authMiddleware(), async (req, res) => {
	let loadoutId = req.params.id

	if (!loadoutId) {
		return res.status(400).send('Loadout id is required')
	}

	let isShared = req.body.shared

	if (isShared == null) {
		return res.status(400).send("'Shared' property is required")
	}

	try {
		let item = await loadout.share(loadoutId, isShared, req.user)

		console.log(`[${req.user.uid}]: Set loadout is shared to ${isShared}`)

		return res.json(item)
	} catch (e) {
		if (e instanceof errors.BadRequestError) {
			console.warn(`[${req.user.uid}]: Bad request when updating loadout ${e.message}`)
			return res.status(400).json({ errors: e })
		}

		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Attempted to update loadout that does not exist (${loadoutId})`)
			return res.status(404).end()
		}

		console.error(`[${req.user.uid}]: Error updating loadout with id ${loadoutId}`, e)
		return res.status(500).end()
	}
})

router.delete('/:id', authMiddleware(), async (req, res) => {
	try {
		await loadout.delete(req.params.id, req.user)

		return res.status(204).end()
	} catch (e) {
		if (e instanceof errors.NotFoundError) {
			console.warn(`[${req.user.uid}]: Attempted to delete loadout that does not exist (${req.params.id})`)
			return res.status(404).end()
		}

		console.error(`[${req.user.uid}]: Error deleting loadout`, e)
		return res.status(500).end()
	}
})

router.use('/:loadoutId/weapons', authMiddleware(), loadoutWeaponRoutes)
router.use('/:loadoutId/gear', authMiddleware(), loadoutGearRoutes)
router.use('/:loadoutId/clothing', authMiddleware(), loadoutClothingRoutes)

module.exports = router
