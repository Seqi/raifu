import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { nanoid } from 'nanoid'
import { EventUser } from '.'

@Entity({ tableName: 'events' })
export class Event {
	@PrimaryKey({ length: 14, default: '' })
	id: string = nanoid(14)

	@Property({ length: 256 })
	name!: string

	@Property({ length: 256 })
	location!: string

	@Property({ length: 6, nullable: true })
	date?: Date

	@Property({ length: 32 })
	organiserUid!: string

	@Property({ default: false })
	public: boolean

	@Property({ fieldName: 'createdAt' })
	createdAt!: Date

	@Property({ fieldName: 'updatedAt' })
	updatedAt!: Date

	@OneToMany(() => EventUser, (user) => user.event)
	users: EventUser
}
