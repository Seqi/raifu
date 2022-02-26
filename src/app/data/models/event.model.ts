import { toEntity } from './entity.model'

class Event {
	// eslint-disable-next-line no-undef
	[key: string]: any

	constructor(entity: any) {
		this.id = entity.id
		this.name = entity.name
		this.location = entity.location
		this.date = new Date(entity.date)
		this.organiserUid = entity.organiserUid
		this.public = entity.public
		this.createdAt = new Date(entity.createdAt)
		this.updatedAt = new Date(entity.updatedAt)
		this.owner = entity.owner
		this.isGroup = entity.isGroup

		this.users = entity.users.map(toEntity)
	}

	getTitle = () => this.name

	getSubtitle = () => `${this.location} @ ${this.date.toLocaleString()}`
}

export default Event
