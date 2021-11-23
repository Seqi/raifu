import { Logger, Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'

import { Weapon } from './models'
import { WeaponService } from './weapon.service'
import { WeaponController } from './weapon.controller'

@Module({
	imports: [MikroOrmModule.forFeature([Weapon])],
	controllers: [WeaponController],
	providers: [WeaponService, Logger],
})
export class WeaponModule {}
