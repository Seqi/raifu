import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core'
import { UserBaseEntity } from '../base.entity'
import { Loadout } from '../loadout'
import { Event } from './event.entity'

@Entity({ tableName: 'event_users' })
@Unique({ name: 'event_users_uid_event_id_key', properties: ['uid', 'event'] })
export class EventUser extends UserBaseEntity {
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

	@Property({ columnType: 'date', fieldName: 'deletedAt', nullable: true })
	deletedAt?: Date
}
