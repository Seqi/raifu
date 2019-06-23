let express = require('express')
let router = express.Router({ strict: true })

const entities = require('../../data/database/entities')
const baseEntity = require('../../data/base-entity')
const errors = require('../../utils/errors')

module.exports = (name) => {
	router.get('/', async (req, res) => {
		try {		
			console.log('vvvvvvvvvvvvvvvv', name)
			let items = await baseEntity(entities()[name], name)
				.getAll(req.user)
	
			return res.json(items)
		} 
		catch (e) {
			res.status(500)
				.end()
		}
	})
	
	router.post('/', async (req, res) => {
		try {		
			let item = await baseEntity(entities()[name], name)
				.add(req.body, req.user)
	
			return res.json(item)
		} 
		catch (e) {
			if (e instanceof errors.BadRequestError) {
				return res.status(401)
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
	
			let item = await baseEntity(entities()[name], name)
				.edit(req.body, req.user)
	
			return res.json(item)
		} 
		catch (e) {
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
	
	router.delete('/:id', async (req, res) => {
		try {
			let item = await baseEntity(entities()[name], name)
				.delete(req.params.id, req.user)
	
			if (item === 0) {
				return res.status(404)
					.end()
			}
	
			return res.json(item)
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

	return router
}