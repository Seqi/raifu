import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'

import { UserBaseEntity } from '../base.entity'
import { LoadoutClothing } from './loadout-clothing.entity'
import { LoadoutGear } from './loadout-gear.entity'
import { LoadoutWeapon } from './loadout-weapon.entity'

@Entity({ tableName: 'loadouts' })
export class Loadout extends UserBaseEntity {
	@Property({ length: 64 })
	name!: string

	@Property({ nullable: true })
	shared?: boolean

	@OneToMany(() => LoadoutWeapon, (weapon) => weapon.loadout)
	weapons: Collection<LoadoutWeapon>

	@OneToMany(() => LoadoutClothing, (clothing) => clothing.loadout)
	clothing: Collection<LoadoutClothing>

	@OneToMany(() => LoadoutGear, (gear) => gear.loadout)
	gear: Collection<LoadoutGear>
}
