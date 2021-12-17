import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { Loadout } from './models'
import { LoadoutService } from './loadout.service'
import { LoadoutController } from './loadout.controller'
import { LoadoutClothing, LoadoutGear, LoadoutWeapon, LoadoutWeaponAttachment } from 'src/entities'
import { LoadoutWeaponService } from './loadout-weapon.service'
import { LoadoutGearService } from './loadout-gear.service'
import { LoadoutWeaponAttachmentService } from './loadout-weapon-attachment.service'
import { LoadoutClothingService } from './loadout-clothing.service'
import { LoadoutWeaponController } from './loadout-weapon.controller'
import { LoadoutWeaponAttachmentController } from './loadout-weapon-attachment.controller'
import { LoadoutGearController } from './loadout-gear.controller'
import { LoadoutClothingController } from './loadout-clothing.controller'

@Module({
	imports: [
		MikroOrmModule.forFeature([
			Loadout,
			LoadoutWeapon,
			LoadoutClothing,
			LoadoutGear,
			LoadoutWeaponAttachment,
		]),
	],
	controllers: [
		LoadoutController,
		LoadoutWeaponController,
		LoadoutWeaponAttachmentController,
		LoadoutGearController,
		LoadoutClothingController,
	],
	providers: [
		LoadoutService,
		LoadoutWeaponService,
		LoadoutWeaponAttachmentService,
		LoadoutGearService,
		LoadoutClothingService,
		Logger,
	],
})
export class LoadoutModule {}
