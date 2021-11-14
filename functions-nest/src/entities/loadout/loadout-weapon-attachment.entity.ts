import { Entity, ManyToOne, PrimaryKeyType, Property, Unique } from '@mikro-orm/core'
import { Attachment, Weapon } from '../armory'
import { LoadoutWeapon } from './loadout-weapon.entity'
import { Loadout } from './loadout.entity'

@Entity({ tableName: 'loadout_weapon_attachments' })
@Unique({
	name: 'loadout_weapon_attachments_loadout_weapon_id_attachment_id_key',
	properties: ['loadoutWeapon', 'attachment'],
})
export class LoadoutWeaponAttachment {
	[PrimaryKeyType]: [string, string, string]

	@ManyToOne({
		entity: () => LoadoutWeapon,
		onUpdateIntegrity: 'cascade',
		onDelete: 'cascade',
		primary: true,
	})
	loadoutWeapon!: LoadoutWeapon

	@ManyToOne({
		entity: () => Loadout,
		onUpdateIntegrity: 'cascade',
		onDelete: 'cascade',
		primary: true,
	})
	loadout!: Loadout

	@ManyToOne({
		entity: () => Weapon,
		onUpdateIntegrity: 'cascade',
		onDelete: 'cascade',
		primary: true,
	})
	weapon!: Weapon

	@ManyToOne({
		entity: () => Attachment,
		onUpdateIntegrity: 'cascade',
		onDelete: 'cascade',
		primary: true,
	})
	attachment!: Attachment

	@Property({ fieldName: 'createdAt' })
	createdAt!: Date

	@Property({ fieldName: 'updatedAt' })
	updatedAt!: Date
}
