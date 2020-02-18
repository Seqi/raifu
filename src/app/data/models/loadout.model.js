class Loadout {
	constructor(item) {
		this.name = item.name
	}

	getTitle = () => this.name
	getSubtitle = () => null
}

export default Loadout