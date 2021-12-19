import { OmitType, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, IsBoolean } from 'class-validator'
import { Weapon, Attachment, Gear, Clothing } from 'src/entities'
import { Loadout } from './models'

export class CreateLoadoutDto {
	@IsNotEmpty()
	@MaxLength(64)
	name!: string

	@IsBoolean()
	shared: boolean
}

export class UpdateLoadoutDto extends PartialType(CreateLoadoutDto) {}

export class ViewLoadoutWeaponDto extends Weapon {
	attachments: Attachment[]
}

export class ViewLoadoutDto extends OmitType(Loadout, ['uid', 'weapons', 'clothing', 'gear']) {
	weapons: ViewLoadoutWeaponDto[]
	gear: Gear[]
	clothing: Clothing[]
}
