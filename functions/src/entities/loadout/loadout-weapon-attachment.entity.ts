import { Entity, ManyToOne, PrimaryKeyType, Unique } from '@mikro-orm/core'
import { Attachment, Weapon } from '../armory'
import { AuditedEntity } from '../base.entity'
import { LoadoutWeapon } from './loadout-weapon.entity'
import { Loadout } from './loadout.entity'

@Entity({ tableName: 'loadout_weapon_attachments' })
@Unique({
	name: 'loadout_weapon_attachments_loadout_weapon_id_attachment_id_key',
	properties: ['loadoutWeapon', 'attachment'],
})
export class LoadoutWeaponAttachment extends AuditedEntity {
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

	constructor(loadoutWeapon: LoadoutWeapon, attachment: Attachment, loadout: Loadout, weapon: Weapon) {
		super()

		this.loadoutWeapon = loadoutWeapon
		this.attachment = attachment
		this.loadout = loadout
		this.weapon = weapon
	}
}
