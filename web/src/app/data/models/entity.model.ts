class Entity {
	[key: string]: any

	constructor(entity: any) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		Object.keys(entity).forEach((key) => (this[key] = entity[key]))
	}

	getTitle = () => {
		if (this['name']) {
			return this['name']
		}

		return this.nickname || `${this.platform}${this.model ? ` ${this.model}` : ''}`
	}

	getSubtitle = () => {
		// Armory items
		if (this.brand) {
			return this.brand
		}

		// Event items
		if (this.date) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const d = new Date(this.date)
			return `${this.location} @ ${d.toLocaleString()}`
		}

		// Loadout items
		return ''
	}
}

export const toEntity = (entity: any) => {
	// Don't convert any non-objects
	if (entity === null || typeof entity !== 'object') {
		return entity
	}

	const e = new Entity(entity)

	// Convert any children
	Object.keys(e).forEach((key) => {
		const prop = e[key]

		if (Array.isArray(prop)) {
			e[key] = prop.map(toEntity)
		} else {
			e[key] = toEntity(prop)
		}
	})

	return e
}
