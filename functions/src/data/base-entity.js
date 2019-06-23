let errors = require('../utils/errors')

module.exports = (entities, entityName = 'entity') => ({
	getAll: async (user) => {
		try {
			let result =  await entities.findAll({
				raw: true,
				where: {
					uid: user.uid
				},
				attributes: {
					exclude: ['uid']
				},
				order: ['createdAt']
			})
			
			console.log(`${user.uid}: Successfuly retrieved ${result.length} ${entityName}s`)

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

			console.log(`Creating ${entityName}`, JSON.stringify(entity))

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

	edit: async (data, user) => {
		if (!data.id) {
			throw new errors.BadRequestError('Id is required')
		}

		try {
			// Ensure this id exists and belongs to the user
			let exists = (await entities.count({
				where: {
					id: data.id,
					uid: user.uid
				}
			})) === 1

			if (!exists) {
				console.warn(`Entity with id ${data.id} does not exist for user ${user.uid}`)
				throw new errors.NotFoundError()
			}

			// Overwrite any attempts to hijack the uid
			let entity = {
				...data,
				uid: user.uid
			}

			console.log(`Editing ${entityName}`, JSON.stringify(entity))

			return await entities.update(entity, {
				where: {
					id: data.id,
					uid: user.uid
				}
			})
		} catch (e) {
			// Validation errors are contained in an array, so pick them out
			let message = e.errors && e.errors.map((error) => error.message)

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
			return await entities.destroy({
				where: {
					id: id,
					uid: user.uid
				}
			})
		} catch (e) {
			console.error(`Error removing ${entityName}`, e)
			throw e
		}
	}
})
