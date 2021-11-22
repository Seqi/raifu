import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { Clothing } from './models'
import { ClothingService } from './services'
import { ClothingController } from './controllers'

@Module({
	imports: [MikroOrmModule.forFeature([Clothing])],
	controllers: [ClothingController],
	providers: [ClothingService, Logger],
})
export class ClothingModule {}
