import { Attachment, Gear, Weapon } from './armory-item'
import { Resource } from './resource'

export interface Loadout extends Resource {
	name: string
	shared: boolean
	weapons: LoadoutWeapon[]
	gear: Gear[]
}

export interface LoadoutWeapon extends Weapon {
	attachments: Attachment[]
}
