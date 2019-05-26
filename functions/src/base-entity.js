const functions = require('./firebase-functions-extensions')

module.exports = (entities, entityName = 'entity') => ({
	getAll: functions.https.onAuthedCall(async (data, context) => {
		try {
			let result =  await entities.findAll({
				raw: true,
				where: {
					uid: context.auth.uid
				},
				attributes: {
					exclude: ['uid']
				},
				order: ['createdAt']
			})
			
			console.log(`${context.auth.uid}: Successfuly retrieved ${result.length} ${entityName}s`)

			return result

		} catch (e) {
			console.error(`Error retrieving ${entityName} for ${context.auth.uid}`, e)
			return new functions.https.HttpsError('unknown', null, 'Unexpected error retrieving data')
		}
	}),

	add: functions.https.onAuthedCall(async (data, context) => {
		try {
			// Overwrite any attempts to hijack the id or uid
			delete data.id 
			let entity = {
				...data,
				uid: context.auth.uid
			}

			console.log(`Creating ${entityName}`, JSON.stringify(entity))

			return (await entities.create(entity)).toJSON()
		} catch (e) {
			// Validation errors are contained in an array, so pick them out
			let message = e.errors && e.errors.map((error) => error.message)

			console.warn(`Failed to create ${entityName}`, message || e.message)
			return new functions.https.HttpsError('invalid-argument', null, message || e.message)
		}
	}),

	edit: functions.https.onAuthedCall(async (data, context) => {
		if (!data.id) {
			return new functions.https.HttpsError('invalid-argument', null, 'Id is required')
		}

		try {

			// Ensure this id exists and belongs to the user
			let exists = (await entities.count({
				where: {
					id: data.id,
					uid: context.auth.uid
				}
			})) === 1

			if (!exists) {
				console.warn(`Entity with id ${data.id} does not exist for user ${data.auth.uid}`)
				return new functions.https.HttpsError('not-found')
			}

			// Overwrite any attempts to hijack the uid
			let entity = {
				...data,
				uid: context.auth.uid
			}

			console.log(`Editing ${entityName}`, JSON.stringify(entity))

			return await entities.update(entity, {
				where: {
					id: data.id,
					uid: context.auth.uid
				}
			})
		} catch (e) {
			// Validation errors are contained in an array, so pick them out
			let message = e.errors && e.errors.map((error) => error.message)

			console.warn(`Failed to update ${entityName}`, message || e.message)
			return new functions.https.HttpsError('invalid-argument', null, message || e.message)
		}
	}),

	delete: functions.https.onAuthedCall(async (id, context) => {
		if (!id) {
			return new functions.https.HttpsError('invalid-argument', 'Id is required', 'Id is required')
		}

		try {
			return await entities.destroy({
				where: {
					id: id,
					uid: context.auth.uid
				}
			})
		} catch (e) {
			console.error(`Error removing ${entityName}`, e)
		}
	})
})
