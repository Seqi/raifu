import { Entity, PrimaryKey, Property, Unique, ManyToOne } from '@mikro-orm/core'
import { Clothing } from '../armory'
import { Loadout } from './loadout.entity'

@Entity()
@Unique({
	name: 'loadout_clothing_loadout_id_clothing_id_key',
	properties: ['loadout', 'clothing'],
})
export class LoadoutClothing {
	@PrimaryKey({ length: 14 })
	id!: string

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

	@Property({ fieldName: 'createdAt', length: 6 })
	createdAt!: Date

	@Property({ fieldName: 'updatedAt', length: 6 })
	updatedAt!: Date
}
