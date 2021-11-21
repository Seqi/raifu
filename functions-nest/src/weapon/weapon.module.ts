import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'
import { WeaponController } from './controllers/weapon/weapon.controller'

import { Weapon } from './models'
import { WeaponService } from './services'

@Module({
	imports: [MikroOrmModule.forFeature([Weapon])],
	controllers: [WeaponController],
	providers: [WeaponService, Logger],
})
export class WeaponModule {}
