import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { Gear } from './models'
import { GearService } from './gear.service'
import { GearController } from './gear.controller'

@Module({
	imports: [MikroOrmModule.forFeature([Gear])],
	controllers: [GearController],
	providers: [GearService, Logger],
})
export class GearModule {}
