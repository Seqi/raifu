import { Entity, OneToMany, Property } from '@mikro-orm/core'

import { EventUser } from './event-user.entity'
import { BaseEntity } from '../base.entity'

@Entity({ tableName: 'events' })
export class Event extends BaseEntity {
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

	@OneToMany(() => EventUser, (user) => user.event)
	users: EventUser
}
