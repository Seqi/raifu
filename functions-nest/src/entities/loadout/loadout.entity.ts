import { Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { Weapon } from '../armory'

@Entity({ tableName: 'loadouts' })
export class Loadout {
	@PrimaryKey({ length: 14 })
	id!: string

	@Property({ length: 64 })
	name!: string

	@Property({ nullable: true })
	shared?: boolean

	@Property({ length: 32 })
	uid!: string

	@Property({ fieldName: 'createdAt', length: 6 })
	createdAt!: Date

	@Property({ fieldName: 'updatedAt', length: 6 })
	updatedAt!: Date

	@ManyToMany({
		entity: () => Weapon,
		pivotTable: 'loadout_weapons',
		joinColumn: 'loadout_id',
		inverseJoinColumn: 'weapon_id',
		owner: true,
	})
	weapons: Weapon[]
}
