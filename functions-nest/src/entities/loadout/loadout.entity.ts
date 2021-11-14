import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { nanoid } from 'nanoid'
import { LoadoutClothing, LoadoutGear } from '.'
import { LoadoutWeapon } from './loadout-weapon.entity'

@Entity({ tableName: 'loadouts' })
export class Loadout {
	@PrimaryKey({ length: 14 })
	id: string = nanoid(14)

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

	@OneToMany(() => LoadoutWeapon, (weapon) => weapon.loadout)
	weapons: LoadoutWeapon[]

	@OneToMany(() => LoadoutClothing, (clothing) => clothing.loadout)
	clothing: LoadoutClothing[]

	@OneToMany(() => LoadoutGear, (gear) => gear.loadout)
	gear: LoadoutGear[]
}
