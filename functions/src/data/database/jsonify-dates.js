let mapEntities = require('./map-entities')

let recursivelyJsonifyDates = (entity) => {
	mapEntities(entity, e => {
		// Jsonify this objects dates if any exist
		convertDatesToJson(e)
	
		// Check if any children also need dates converting
		Object.keys(e)
			.filter(key => e[key] !== null && typeof e[key] === 'object')
			.forEach(key => mapEntities(e[key], recursivelyJsonifyDates))
	})
	
}

let convertDatesToJson = (entity) => {
	if (entity.createdAt) {
		let date = new Date(entity.createdAt)
		entity.createdAt = date.toJSON()
	}
		
	if (entity.updatedAt) {
		let date = new Date(entity.updatedAt)
		entity.updatedAt = date
	}
}

module.exports = recursivelyJsonifyDates