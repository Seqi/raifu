import { Collection, Entity, ManyToMany } from '@mikro-orm/core'
import { Attachment } from '.'
import { Armory } from './armory.entity'

@Entity({ tableName: 'weapons' })
export class Weapon extends Armory {
	@ManyToMany({
		entity: () => Attachment,
		pivotTable: 'loadout_weapon_attachments',
		joinColumn: 'weapon_id',
		inverseJoinColumn: 'attachment_id',
	})
	attachments: Collection<Attachment>
}
