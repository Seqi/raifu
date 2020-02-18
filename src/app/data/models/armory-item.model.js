class ArmoryItem {
	constructor(item) {
		this.name = item.name
		this.nickname = item.nickname
		this.platform = item.platform
		this.model = item.model
		this.brand = item.brand
	}

	getTitle = () => {
		if (this.name) {
			return this.name
		}

		return this.nickname || `${this.platform} ${this.model}`
	}

	getSubtitle = () => this.brand
}

export default ArmoryItem