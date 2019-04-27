let jsonifyDates = (entities) => {
	if (Array.isArray(entities)) {
		entities.forEach(recursivelyJsonifyDates)
	} else {
		recursivelyJsonifyDates(entities)
	}
}

let recursivelyJsonifyDates = (entity) => {
	// Get object that contains the raw object
	let obj = entity.dataValues ? entity.dataValues : entity

	// Jsonify this objects dates if any exist
	convertDatesToJson(obj)

	// Check if any children also need dates converting
	Object.keys(obj)
		.filter(key => obj[key] !== null && typeof obj[key] === 'object')
		.forEach(key => jsonifyDates(obj[key]))
}

let convertDatesToJson = (entity) => {
	if (entity.createdAt) {
		entity.createdAt = entity.createdAt.toJSON()
	}
		
	if (entity.updatedAt) {
		entity.updatedAt = entity.updatedAt.toJSON()
	}
}

module.exports = jsonifyDates