import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Inject,
	Logger,
	LoggerService,
	NotFoundException,
	Put,
	HttpCode,
	HttpStatus,
} from '@nestjs/common'

import { Event } from 'src/entities'
import { EventService } from './event.service'
import { CreateEventDto, UpdateEventDto, ViewEventDto } from './event.dto'
import { UserService } from 'src/auth'

@Controller('events')
export class EventController {
	constructor(
		private readonly events: EventService,
		private user: UserService,
		@Inject(Logger) private logger: LoggerService,
	) {}

	@Get()
	async findAll(): Promise<Event[]> {
		try {
			this.logger.log({ message: `Retrieving events.`, userId: this.user.uid })

			const events = await this.events.getAll()

			this.logger.log({
				message: `Successfuly retrieved ${events.length} events.`,
				itemCount: events.length,
				userId: this.user.uid,
				event: `EVENT_LIST_VIEWED`,
			})

			return events
		} catch (e) {
			this.logger.error(`Failed to retrieve loadouts.`, { userId: this.user.uid })
			throw e
		}
	}

	@Get(':id')
	async findOne(@Param('id') eventId: string): Promise<ViewEventDto> {
		try {
			this.logger.log({ message: `Retrieving events`, eventId, userId: this.user.uid })

			const event = await this.events.getById(eventId)

			if (!event) {
				this.logger.warn({
					message: 'Could not find event.',
					userId: this.user.uid,
					eventId,
					anonymous: !!this.user,
				})

				throw new NotFoundException('Could not find event.')
			}

			this.logger.log({
				message: `Successfuly retrieved event.`,
				userId: this.user.uid,
				eventId,
				event: `EVENT_VIEWED`,
			})

			return event
		} catch (e) {
			this.logger.warn('Error retrieving event.', {
				userId: this.user.uid,
				eventId,
				anonymous: !!this.user,
			})
			throw e
		}
	}

	@Post()
	async create(@Body() dto: CreateEventDto) {
		try {
			this.logger.log({ message: 'Creating event.', userId: this.user.uid, item: dto })

			const result = await this.events.add(dto)

			this.logger.log({
				message: `Successfully created event.`,
				userId: this.user.uid,
				itemId: result.id,
				event: `EVENT_CREATED`,
				result,
			})

			return result
		} catch (e) {
			this.logger.error({ message: `An error occurred adding event.`, userId: this.user.uid, item: dto })

			throw e
		}
	}

	@Put(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async update(@Param('id') eventId: string, @Body() dto: UpdateEventDto) {
		try {
			this.logger.log({ message: `Updating event.`, userId: this.user.uid, itemId: eventId, item: dto })

			await this.events.update(eventId, dto)

			this.logger.log({
				message: `Successfully updated event.`,
				userId: this.user.uid,
				itemId: eventId,
				item: dto,
				event: `EVENT_UPDATED`,
			})
		} catch (e) {
			this.logger.error({ message: `An error occurred updating event.`, userId: this.user.uid, item: dto })

			throw e
		}
	}

	@Delete(':id')
	async delete(@Param('id') eventId: string) {
		try {
			this.logger.log({ message: `Deleting event.`, userId: this.user.uid, itemId: eventId })

			await this.events.remove(eventId)

			this.logger.log({
				message: `Successfully deleted event.`,
				userId: this.user.uid,
				itemId: eventId,
				event: `EVENT_DELETED`,
			})
		} catch (e) {
			this.logger.error({ message: `Error deleting event.`, userId: this.user.uid, itemId: eventId })

			throw e
		}
	}

	@Post(':id/loadout/remove')
	@HttpCode(HttpStatus.NO_CONTENT)
	async removeLoadout(@Param('id') eventId: string) {
		try {
			this.logger.log({ message: 'Removing loadout from event.', userId: this.user.uid, eventId })

			const loadout = await this.events.setEventLoadout(eventId, null)
			this.logger.log({
				message: 'Successfully removed loadout from event.',
				user: this.user.uid,
				eventId,
				event: 'EVENT_REMOVED_LOADOUT',
			})

			return loadout
		} catch (e) {
			this.logger.error({
				message: 'An error occurred removing loadout from event.',
				userId: this.user.uid,
				eventId,
			})

			throw e
		}
	}

	@Post(':id/loadout/:loadoutId')
	@HttpCode(HttpStatus.NO_CONTENT)
	async setLoadout(@Param('id') eventId: string, @Param('loadoutId') loadoutId: string) {
		try {
			this.logger.log({ message: 'Setting loadout on event.', userId: this.user.uid, eventId, loadoutId })

			const loadout = await this.events.setEventLoadout(eventId, loadoutId)

			this.logger.log({
				message: 'Successfully set loadout on event.',
				user: this.user.uid,
				eventId,
				loadoutId,
				event: 'EVENT_SET_LOADOUT',
			})

			return loadout
		} catch (e) {
			this.logger.error({
				message: 'An error occurred setting loadout on event.',
				userId: this.user.uid,
				eventId,
			})

			throw e
		}
	}

	@Post(':id/join')
	@HttpCode(HttpStatus.NO_CONTENT)
	async join(@Param('id') eventId: string) {
		try {
			this.logger.log({ message: 'Joining event.', userId: this.user.uid, eventId })

			await this.events.join(eventId)

			this.logger.log({
				message: 'Successfully joined event.',
				user: this.user.uid,
				eventId,
				event: 'EVENT_JOINED',
			})
		} catch (e) {
			this.logger.error({
				message: 'An error occurred joining event.',
				userId: this.user.uid,
				eventId,
			})

			throw e
		}
	}

	@Post(':id/leave')
	@HttpCode(HttpStatus.NO_CONTENT)
	async leave(@Param('id') eventId: string) {
		try {
			this.logger.log({ message: 'Leaving event.', userId: this.user.uid, eventId })

			await this.events.leave(eventId)

			this.logger.log({
				message: 'Successfully left event.',
				user: this.user.uid,
				eventId,
				event: 'EVENT_LEFT',
			})
		} catch (e) {
			this.logger.error({
				message: 'An error occurred leaving event.',
				userId: this.user.uid,
				eventId,
			})

			throw e
		}
	}
}
