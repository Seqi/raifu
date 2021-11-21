import { Entity, ManyToOne, Unique } from '@mikro-orm/core'

import { BaseEntity } from '../base.entity'
import { Gear } from '../armory'
import { Loadout } from './loadout.entity'

@Entity()
@Unique({
	name: 'loadout_gear_loadout_id_gear_id_key',
	properties: ['loadout', 'gear'],
})
export class LoadoutGear extends BaseEntity {
	@ManyToOne({ entity: () => Loadout, onUpdateIntegrity: 'cascade', onDelete: 'cascade' })
	loadout!: Loadout

	@ManyToOne({ entity: () => Gear, onUpdateIntegrity: 'cascade', onDelete: 'cascade' })
	gear!: Gear
}
