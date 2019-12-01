module.exports = function mapEntities(entities, mapFunction) {
	if (!entities) {
		return 
	}
	
	if (Array.isArray(entities)) {
		entities.forEach((e) => {			
			let obj = e.dataValues ? e.dataValues : e

			mapFunction(obj)
		})
	} else {
		let obj = entities.dataValues ? entities.dataValues : entities
		mapFunction(obj)
	}
}