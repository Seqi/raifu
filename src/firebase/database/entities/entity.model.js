let Entity = (entity) => ({
	...entity,
	getTitle: () => {
		if (entity.name) {
			return entity.name
		}

		return entity.nickname || `${entity.platform} ${entity.model}`
	},
	getSubtitle() {
		// Armory items
		if (entity.brand) {
			return entity.brand
		}

		// Event items
		if (entity.date) {
			let d = new Date(entity.date)
			return `${entity.location} @ ${d.toLocaleString()}`
		}

		// Loadout items
		return ''
	}
})

let toEntity = (entity) => {
	// Don't convert any non-objects
	if (entity === null || typeof entity !== 'object') {
		return entity
	}

	let e = new Entity(entity)

	// Convert any children 
	Object.keys(e)
		.forEach(key => {
			let prop = e[key]
		
			if (Array.isArray(prop)) {
				e[key] = prop.map(toEntity)
			} else {
				e[key] = toEntity(prop)
			}
		})

	return e		
}

export default Entity
export { Entity, toEntity }