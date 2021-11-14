import { Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core'
import { nanoid } from 'nanoid'
import { Loadout } from '../loadout'
import { Event } from './event.entity'

@Entity({ tableName: 'event_users' })
@Unique({ name: 'event_users_uid_event_id_key', properties: ['uid', 'event'] })
export class EventUser {
	@PrimaryKey({ length: 14, default: '' })
	id: string = nanoid(14)

	@Property({ length: 32 })
	uid!: string

	@ManyToOne({
		entity: () => Event,
		onUpdateIntegrity: 'cascade',
		onDelete: 'cascade',
		nullable: true,
	})
	event?: Event

	@ManyToOne({
		entity: () => Loadout,
		onUpdateIntegrity: 'cascade',
		onDelete: 'set null',
		nullable: true,
	})
	loadout?: Loadout

	@Property({ fieldName: 'createdAt', length: 6 })
	createdAt!: Date

	@Property({ fieldName: 'updatedAt', length: 6 })
	updatedAt!: Date

	@Property({ columnType: 'date', fieldName: 'deletedAt', nullable: true })
	deletedAt?: Date
}
