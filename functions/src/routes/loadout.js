let express = require('express')
let router = express.Router()

let loadoutWeaponRoutes = require('./loadout-weapon')
let loadoutGearRoutes = require('./loadout-gear')

let loadout = require('../data/loadout')
let errors = require('../utils/errors')

router.get('/', async (req, res) => {
	try {
		let items = await loadout.getAll(req.user)

		return res.json(items)
	} 
	catch (e) {
		res.status(500)
			.end()
	}
})

router.get('/:id', async (req, res) => {
	try {
		let item = await loadout.getById(req.params.id, req.user)
		
		return res.json(item)
	} catch (e) {
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

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
	try {
		await loadout.delete(req.params.id, req.user)

		return res.status(204)
			.end()
	} 
	catch (e) {
		if (e instanceof errors.BadRequestError) {
			return res.status(401)
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

router.use('/:loadoutId/weapons', loadoutWeaponRoutes)
router.use('/:loadoutId/gear', loadoutGearRoutes)

module.exports = router
