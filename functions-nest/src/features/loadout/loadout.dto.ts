import { OmitType, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, IsBoolean } from 'class-validator'
import { Weapon, Attachment, Gear, Clothing, LoadoutWeapon } from 'src/entities'
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

	static fromLoadoutWeapon(loadoutWeapon: LoadoutWeapon): ViewLoadoutWeaponDto {
		const attachments = loadoutWeapon.attachments.getSnapshot().map((lwa) => {
			const attachment: Attachment = {
				...lwa.attachment,
				createdAt: lwa.createdAt,
				updatedAt: lwa.updatedAt,
			}

			return attachment
		})

		const loadoutWeaponDto: ViewLoadoutWeaponDto = {
			...loadoutWeapon.weapon,
			createdAt: loadoutWeapon.createdAt,
			updatedAt: loadoutWeapon.updatedAt,
			attachments,
		}

		return loadoutWeaponDto
	}
}

export class ViewLoadoutDto extends OmitType(Loadout, ['uid', 'weapons', 'clothing', 'gear']) {
	weapons: ViewLoadoutWeaponDto[]
	gear: Gear[]
	clothing: Clothing[]

	static fromLoadout(loadout: Loadout): ViewLoadoutDto {
		const weapons = loadout.weapons
			.getSnapshot()
			.sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate())
			.map(ViewLoadoutWeaponDto.fromLoadoutWeapon)

		const gear: Gear[] = loadout.gear
			.getSnapshot()
			.sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate())
			.flatMap((loadoutGear) => ({
				...loadoutGear.gear,
				createdAt: loadoutGear.createdAt,
				updatedAt: loadoutGear.updatedAt,
			}))

		const clothing: Clothing[] = loadout.clothing
			.getSnapshot()
			.sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate())
			.flatMap((loadoutClothing) => ({
				...loadoutClothing.clothing,
				createdAt: loadoutClothing.createdAt,
				updatedAt: loadoutClothing.updatedAt,
			}))

		const dto: ViewLoadoutDto = {
			id: loadout.id,
			name: loadout.name,
			shared: loadout.shared,
			weapons,
			gear,
			clothing,
			createdAt: loadout.createdAt,
			updatedAt: loadout.updatedAt,
		}

		return dto
	}
}
