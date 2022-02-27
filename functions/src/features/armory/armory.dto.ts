import { Attachment, Clothing, Gear, Weapon } from 'src/entities'

export type ArmoryDto = {
	weapons: Weapon[]
	attachments: Attachment[]
	gear: Gear[]
	clothing: Clothing[]
}
