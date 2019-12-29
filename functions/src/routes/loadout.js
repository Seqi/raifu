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

		return res.json(items)
	} 
	catch (e) {
		res.status(500)
			.end()
	}
})

router.get('/:id', authMiddleware(false), async (req, res) => {
	try {
		let item = await loadout.getById(req.params.id, req.user)
		return res.json(item)
	} catch (e) {
		console.log('error getting loadout', e)
		if (e instanceof errors.BadRequestError) {
			return res.status(400)
				.json({ errors: e.message })
		}

		if (e instanceof errors.NotFoundError) {
			return res.status(404)
				.end()
		}

		return res.status(500)
			.end()
	}
})

router.post('/', authMiddleware(), async (req, res) => {
	try {		
		let item = await loadout.add(req.body, req.user)

		return res.json(item)
	} 
	catch (e) {
		if (e instanceof errors.BadRequestError) {
			return res.status(400)
				.json({ errors: e.message.split(',') })
		}

		return res.status(500)
			.end()
	}
})

router.put('/:id', authMiddleware(), async (req, res) => {
	try {
		let entity = req.body

		if (!entity.id) {
			entity.id = req.params.id
		}

		let item = await loadout.edit(req.body, req.user)

		return res.json(item)
	} 
	catch (e) {
		if (e instanceof errors.BadRequestError) {
			return res.status(400)
				.json({ errors: e })
		}

		if (e instanceof errors.NotFoundError) {
			return res.status(404)
				.end()
		}

		return res.status(500)
			.end()
	}
})

router.delete('/:id', authMiddleware(), async (req, res) => {
	try {
		await loadout.delete(req.params.id, req.user)

		return res.status(204)
			.end()
	} 
	catch (e) {
		if (e instanceof errors.BadRequestError) {
			return res.status(400)
				.end(e.message)
		}

		if (e instanceof errors.NotFoundError) {
			return res.status(404)
				.end()
		}

		return res.status(500)
			.end()
	}
})

router.use('/:loadoutId/weapons', authMiddleware(), loadoutWeaponRoutes)
router.use('/:loadoutId/gear', authMiddleware(), loadoutGearRoutes)
router.use('/:loadoutId/clothing', authMiddleware(), loadoutClothingRoutes)

module.exports = router
