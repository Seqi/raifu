import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { Loadout } from './models'
import { LoadoutService } from './services'
import { LoadoutController } from './controllers'

@Module({
	imports: [MikroOrmModule.forFeature([Loadout])],
	controllers: [LoadoutController],
	providers: [LoadoutService, Logger],
})
export class LoadoutModule {}
