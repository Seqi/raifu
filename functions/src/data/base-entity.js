const errors = require('../utils/errors')

module.exports = (entities, entityName = 'entity') => ({
	getAll: async (user) => {
		try {
			let result =  await entities.findAll({
				where: {
					uid: user.uid
				},
				attributes: {
					exclude: ['uid']
				},
				order: ['createdAt']
			})

			return result

		} catch (e) {
			console.log(`Error retrieving ${entityName} for ${user.uid}`, e)
			throw e
		}
	},

	add: async (data, user) => {
		try {
			// Overwrite any attempts to hijack the id or uid
			delete data.id 
			let entity = {
				...data,
				uid: user.uid
			}

			return (await entities.create(entity)).toJSON()
		} catch (e) {
			// Validation errors are contained in an array, so pick them out
			let message = e.errors && e.errors.map((error) => error.message)
			console.error(message || e.message)

			if (message) {
				throw new errors.BadRequestError(message)
			} else {
				throw new Error(e.message)
			}
		}
	},

	
	delete: async (id, user) => {
		if (!id) {
			throw new errors.BadRequestError('Id is required')
		}

		try {
			let result = await entities.destroy({
				where: {
					id: id,
					uid: user.uid
				}
			})

			if (result === 0) {
				throw new errors.NotFoundError()
			}
		} catch (e) {
			console.error(`Error removing ${entityName}`, e)
			throw e
		}
	}
})
