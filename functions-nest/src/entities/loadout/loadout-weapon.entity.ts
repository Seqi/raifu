import {
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
	Unique,
} from '@mikro-orm/core'
import { nanoid } from 'nanoid'

import { Weapon } from '../armory'
import { Loadout } from './loadout.entity'
import { LoadoutWeaponAttachment } from './loadout-weapon-attachment.entity'

@Entity({ tableName: 'loadout_weapons' })
@Unique({
	name: 'loadout_weapons_loadout_id_weapon_id_key',
	properties: ['loadout', 'weapon'],
})
export class LoadoutWeapon {
	@PrimaryKey({ length: 14 })
	id: string = nanoid(14)

	@ManyToOne({ entity: () => Loadout, onUpdateIntegrity: 'cascade', onDelete: 'cascade' })
	loadout!: Loadout

	@ManyToOne({ entity: () => Weapon, onUpdateIntegrity: 'cascade', onDelete: 'cascade' })
	weapon!: Weapon

	@Property({ fieldName: 'createdAt' })
	createdAt!: Date

	@Property({ fieldName: 'updatedAt' })
	updatedAt!: Date

	@OneToMany(() => LoadoutWeaponAttachment, (attachment) => attachment.loadoutWeapon)
	attachments: LoadoutWeaponAttachment
}
