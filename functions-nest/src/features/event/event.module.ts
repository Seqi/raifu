import { Logger, Module } from '@nestjs/common'
import { EventService } from './event.service'
import { EventController } from './event.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Loadout, LoadoutService } from '../loadout'
import { Event, EventUser } from 'src/entities'
import { EventUserService } from './event-user.service'

@Module({
	imports: [MikroOrmModule.forFeature([Event, EventUser, Loadout])],
	controllers: [EventController],
	providers: [EventService, EventUserService, Logger, LoadoutService],
})
export class EventModule {}
