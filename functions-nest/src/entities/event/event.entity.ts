import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ tableName: 'events' })
export class Event {
	@PrimaryKey({ length: 14, default: '' })
	id!: string

	@Property({ length: 256 })
	name!: string

	@Property({ length: 256 })
	location!: string

	@Property({ length: 6, nullable: true })
	date?: Date

	@Property({ length: 32 })
	organiserUid!: string

	@Property()
	public = false

	@Property({ fieldName: 'createdAt', length: 6 })
	createdAt!: Date

	@Property({ fieldName: 'updatedAt', length: 6 })
	updatedAt!: Date
}
