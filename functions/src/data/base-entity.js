const errors = require('../utils/errors')

module.exports = (entities) => ({
	getAll: async (user) => {
		let result = await entities.findAll({
			where: {
				uid: user.uid,
			},
			attributes: {
				exclude: ['uid'],
			},
			order: ['createdAt'],
		})

		return result.map((item) => item.toJSON())
	},

	add: async (data, user) => {
		try {
			// Overwrite any attempts to hijack the id or uid
			delete data.id
			let entity = {
				...data,
				uid: user.uid,
			}

			return (await entities.create(entity)).toJSON()
		} catch (e) {
			// Validation errors are contained in an array, so pick them out
			let message = e.errors && e.errors.map((error) => error.message)

			if (message) {
				throw new errors.BadRequestError(message)
			} else {
				throw e
			}
		}
	},

	delete: async (id, user) => {
		let result = await entities.destroy({
			where: {
				id: id,
				uid: user.uid,
			},
		})

		if (result === 0) {
			throw new errors.NotFoundError()
		}
	},
})
