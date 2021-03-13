import { Attachment, Weapon } from './armory-item'
import { Resource } from './resource'

export interface Loadout extends Resource {
	name: string
	shared: boolean
	weapons: LoadoutWeapon[]
}

export interface LoadoutWeapon extends Weapon {
	attachments: Attachment[]
}
