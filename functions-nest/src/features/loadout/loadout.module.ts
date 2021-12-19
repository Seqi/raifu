import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { LoadoutClothing, LoadoutGear, LoadoutWeapon, LoadoutWeaponAttachment } from 'src/entities'
import { Loadout } from './models'
import {
	LoadoutService,
	LoadoutClothingService,
	LoadoutGearService,
	LoadoutWeaponAttachmentService,
	LoadoutWeaponService,
} from './services'

import {
	LoadoutController,
	LoadoutClothingController,
	LoadoutGearController,
	LoadoutWeaponAttachmentController,
	LoadoutWeaponController,
} from './controllers'

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
