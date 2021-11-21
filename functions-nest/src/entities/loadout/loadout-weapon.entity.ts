import { Entity, ManyToOne, OneToMany, Unique } from '@mikro-orm/core'

import { BaseEntity } from '../base.entity'
import { Weapon } from '../armory'
import { Loadout } from './loadout.entity'
import { LoadoutWeaponAttachment } from './loadout-weapon-attachment.entity'

@Entity({ tableName: 'loadout_weapons' })
@Unique({
	name: 'loadout_weapons_loadout_id_weapon_id_key',
	properties: ['loadout', 'weapon'],
})
export class LoadoutWeapon extends BaseEntity {
	@ManyToOne({ entity: () => Loadout, onUpdateIntegrity: 'cascade', onDelete: 'cascade' })
	loadout!: Loadout

	@ManyToOne({ entity: () => Weapon, onUpdateIntegrity: 'cascade', onDelete: 'cascade' })
	weapon!: Weapon

	@OneToMany(() => LoadoutWeaponAttachment, (attachment) => attachment.loadoutWeapon)
	attachments: LoadoutWeaponAttachment
}
