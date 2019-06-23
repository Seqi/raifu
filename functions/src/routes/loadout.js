let express = require('express')
let router = express.Router()

const loadout = require('../data/loadout')
const errors = require('../utils/errors')

let baseEntityRoutes = require('./abstract/base-entity')

let routes = () => {
	router.use('/', baseEntityRoutes('loadout'))
	router.get('/:id', async (req, res) => {
		try {
			if (!req.params.id) {
				res.status(400)
					.json({ error: 'Id is required' })
			}

			let item = await loadout.getById(req.params.id, req.user)
			return res.json(item)
		} catch (e) {
			if (e instanceof errors.BadRequestError) {
				return res.status(401)
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

	return router
}

module.exports = routes
