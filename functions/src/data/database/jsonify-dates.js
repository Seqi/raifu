let mapEntities = require('./map-entities')

let recursivelyJsonifyDates = (entity) => {
	mapEntities(entity, e => {// Jsonify this objects dates if any exist
		convertDatesToJson(e)
	
		// Check if any children also need dates converting
		Object.keys(e)
			.filter(key => e[key] !== null && typeof e[key] === 'object')
			.forEach(key => mapEntities(e[key], recursivelyJsonifyDates))
	})
	
}

let convertDatesToJson = (entity) => {
	if (entity.createdAt) {
		entity.createdAt = entity.createdAt.toJSON()
	}
		
	if (entity.updatedAt) {
		entity.updatedAt = entity.updatedAt.toJSON()
	}
}

module.exports = recursivelyJsonifyDates