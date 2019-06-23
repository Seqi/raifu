module.exports = function mapEntities(entities, fn) {
	if (!entities) {
		return 
	}
	
	if (Array.isArray(entities)) {
		entities.forEach((e) => {			
			let obj = e.dataValues ? e.dataValues : e

			fn(obj)
		})
	} else {
		let obj = entities.dataValues ? entities.dataValues : entities
		fn(obj)
	}
}