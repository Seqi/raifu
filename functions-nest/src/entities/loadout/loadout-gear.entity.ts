import { Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core'
import { nanoid } from 'nanoid'
import { Gear } from '../armory'
import { Loadout } from './loadout.entity'

@Entity()
@Unique({
	name: 'loadout_gear_loadout_id_gear_id_key',
	properties: ['loadout', 'gear'],
})
export class LoadoutGear {
	@PrimaryKey({ length: 14 })
	id: string = nanoid(14)

	@ManyToOne({ entity: () => Loadout, onUpdateIntegrity: 'cascade', onDelete: 'cascade' })
	loadout!: Loadout

	@ManyToOne({ entity: () => Gear, onUpdateIntegrity: 'cascade', onDelete: 'cascade' })
	gear!: Gear

	@Property({ fieldName: 'createdAt' })
	createdAt!: Date

	@Property({ fieldName: 'updatedAt' })
	updatedAt!: Date
}
