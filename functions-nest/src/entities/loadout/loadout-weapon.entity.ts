import { Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core'
import { Weapon } from '../armory'
import { Loadout } from './loadout.entity'

@Entity({ tableName: 'loadout_weapons' })
@Unique({
	name: 'loadout_weapons_loadout_id_weapon_id_key',
	properties: ['loadout', 'weapon'],
})
export class LoadoutWeapon {
	@PrimaryKey({ length: 14 })
	id!: string

	@ManyToOne({
		entity: () => Loadout,
		onUpdateIntegrity: 'cascade',
		onDelete: 'cascade',
	})
	loadout!: Loadout

	@ManyToOne({ entity: () => Weapon, onUpdateIntegrity: 'cascade', onDelete: 'cascade' })
	weapon!: Weapon

	@Property({ fieldName: 'createdAt', length: 6 })
	createdAt!: Date

	@Property({ fieldName: 'updatedAt', length: 6 })
	updatedAt!: Date
}
