import { toEntity } from './entity.model'

class Event {
	constructor(entity) {
		this.id = entity.id
		this.name = entity.name
		this.location = entity.location
		this.date = new Date(entity.date)
		this.organiser_uid = entity.organiser_uid
		this.public = entity.public
		this.createdAt = new Date(entity.createdAt)
		this.updatedAt = new Date(entity.updatedAt)

		this.users = entity.users.map(toEntity)
	}

	getTitle = () => this.name

	getSubtitle = () => `${this.location} @ ${this.date.toLocaleString()}`
}

export default Event