import { Logger, Module } from '@nestjs/common'
import { EventService } from './event.service'
import { EventController } from './event.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Loadout } from '../loadout'
import { EventUser } from 'src/entities'

@Module({
	imports: [MikroOrmModule.forFeature([Event, EventUser, Loadout])],
	controllers: [EventController],
	providers: [EventService, Logger],
})
export class EventModule {}
