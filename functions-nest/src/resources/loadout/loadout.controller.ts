import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
	LoggerService,
	NotFoundException,
	Param,
	Post,
	Put,
} from '@nestjs/common'
import { Loadout } from 'src/entities'
import { FirebaseUserService } from 'src/firebase'
import { CreateLoadoutDto, UpdateLoadoutDto } from './loadout.dto'
import { LoadoutService } from './loadout.service'

@Controller('loadouts')
export class LoadoutController {
	constructor(
		private service: LoadoutService,
		private user: FirebaseUserService,
		@Inject(Logger) private logger: LoggerService,
	) {}

	@Get()
	async getAll(): Promise<Loadout[]> {
		try {
			this.logger.log(`Retrieving loadouts`, { userId: this.user.uid })

			const items = await this.service.getAll()

			this.logger.log(`Successfuly retrieved ${items.length} loadouts`, {
				userId: this.user.uid,
				event: `LOADOUTS_VIEWED`,
			})

			return items
		} catch (e) {
			this.logger.error(`Failed to retrieve loadouts.`, { userId: this.user.uid })
			throw e
		}
	}

	@Get(':id')
	async get(@Param('id') loadoutId: string): Promise<Loadout> {
		try {
			this.logger.log(`Retrieving loadouts`, { loadoutId, userId: this.user.uid })

			const loadout = await this.service.getById(loadoutId)

			if (!loadout) {
				this.logger.warn({
					message: 'Could not find loadout.',
					userId: this.user.uid,
					loadoutId: loadoutId,
					anonymous: !!this.user,
				})

				throw new NotFoundException('Could not find loadout.')
			}

			this.logger.log(`Successfuly retrieved loadout`, {
				userId: this.user.uid,
				loadoutId,
				event: `LOADOUT_VIEWED`,
			})

			return loadout
		} catch (e) {
			this.logger.warn('Error retrieving loadout.', {
				userId: this.user.uid,
				loadoutId,
				anonymous: !!this.user,
			})
			throw e
		}
	}

	@Post()
	async create(@Body() dto: CreateLoadoutDto): Promise<Loadout> {
		try {
			this.logger.log(`Creating loadout.`, { userId: this.user.uid, item: dto })

			const result = await this.service.add(dto)
			this.logger.log(`Successfully created loadout.`, {
				userId: this.user.uid,
				itemId: result.id,
				event: `LOADOUT_CREATED`,
				result,
			})

			return result
		} catch (e) {
			this.logger.error(`An error occurred adding loadout`, {
				userId: this.user.uid,
				item: dto,
			})

			throw e
		}
	}

	@Put(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async update(@Param('id') loadoutId, @Body() dto: UpdateLoadoutDto): Promise<void> {
		try {
			this.logger.log(`Updating loadout.`, { userId: this.user.uid, itemId: loadoutId, item: dto })

			await this.service.update(loadoutId, dto)
			this.logger.log(`Successfully updated loadout.`, {
				userId: this.user.uid,
				itemId: loadoutId,
				item: dto,
				event: `LOADOUT_UPDATED`,
			})
		} catch (e) {
			this.logger.error(`An error occurred updating loadout`, {
				userId: this.user.uid,
				item: dto,
			})

			throw e
		}
	}

	@Delete(':id')
	async delete(@Param('id') loadoutId: string) {
		try {
			this.logger.log(`Deleting loadout.`, { userId: this.user.uid, itemId: loadoutId })

			await this.service.remove(loadoutId)

			this.logger.log(`Successfully deleted loadout.`, {
				userId: this.user.uid,
				itemId: loadoutId,
				event: `LOADOUT_DELETED`,
			})
		} catch (e) {
			this.logger.error(`Error deleting loadout.`, {
				userId: this.user.uid,
				itemId: loadoutId,
			})

			throw e
		}
	}
}
