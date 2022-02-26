import { Logger, Module } from '@nestjs/common'
import { ArmoryService } from './armory.service'
import { ArmoryController } from './armory.controller'

@Module({
	controllers: [ArmoryController],
	providers: [ArmoryService, Logger],
})
export class ArmoryModule {}
