import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { Weapon } from './models'
import { WeaponService } from './services'
import { WeaponController } from './controllers/'

@Module({
	imports: [MikroOrmModule.forFeature([Weapon])],
	controllers: [WeaponController],
	providers: [WeaponService, Logger],
})
export class WeaponModule {}
