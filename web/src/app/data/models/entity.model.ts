class Entity {
	// eslint-disable-next-line no-undef
	[key: string]: any

	constructor(entity: any) {
		Object.keys(entity).forEach((key) => (this[key] = entity[key]))
	}

	getTitle = () => {
		if (this['name']) {
			return this['name']
		}

		return this.nickname || `${this.platform}${this.model ? ' ' + this.model : ''}`
	}

	getSubtitle = () => {
		// Armory items
		if (this.brand) {
			return this.brand
		}

		// Event items
		if (this.date) {
			let d = new Date(this.date)
			return `${this.location} @ ${d.toLocaleString()}`
		}

		// Loadout items
		return ''
	}
}

let toEntity = (entity: any) => {
	// Don't convert any non-objects
	if (entity === null || typeof entity !== 'object') {
		return entity
	}

	let e = new Entity(entity)

	// Convert any children
	Object.keys(e).forEach((key) => {
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
