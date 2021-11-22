import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { Gear } from './models'
import { GearService } from './services'
import { GearController } from './controllers'

@Module({
	imports: [MikroOrmModule.forFeature([Gear])],
	controllers: [GearController],
	providers: [GearService, Logger],
})
export class GearModule {}
