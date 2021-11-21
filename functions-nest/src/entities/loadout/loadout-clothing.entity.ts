import { Entity, Unique, ManyToOne } from '@mikro-orm/core'

import { BaseEntity } from '../base.entity'
import { Clothing } from '../armory'
import { Loadout } from './loadout.entity'

@Entity()
@Unique({
	name: 'loadout_clothing_loadout_id_clothing_id_key',
	properties: ['loadout', 'clothing'],
})
export class LoadoutClothing extends BaseEntity {
	@ManyToOne({
		entity: () => Loadout,
		onUpdateIntegrity: 'cascade',
		onDelete: 'cascade',
	})
	loadout!: Loadout

	@ManyToOne({
		entity: () => Clothing,
		onUpdateIntegrity: 'cascade',
		onDelete: 'cascade',
	})
	clothing!: Clothing
}
