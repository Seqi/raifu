import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { Loadout } from './models'
import { LoadoutService } from './loadout.service'
import { LoadoutController } from './loadout.controller'

@Module({
	imports: [MikroOrmModule.forFeature([Loadout])],
	controllers: [LoadoutController],
	providers: [LoadoutService, Logger],
})
export class LoadoutModule {}
