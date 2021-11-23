import {
	Controller,
	Delete,
	Get,
	Inject,
	Logger,
	LoggerService,
	Param,
	Post,
} from '@nestjs/common'

import { Gear } from 'src/entities'
import { FirebaseUserService } from 'src/firebase'
import { GearService } from './gear.service'

@Controller('gear')
export class GearController {
	constructor(
		private service: GearService,
		private user: FirebaseUserService,
		@Inject(Logger) private logger: LoggerService,
	) {}

	@Get()
	async getAll(): Promise<Gear[]> {
		try {
			this.logger.log(`Retrieving gear`, { userId: this.user.uid })

			const items = await this.service.getAll()

			this.logger.log(`Successfuly retrieved ${items.length} gear`, {
				userId: this.user.uid,
				event: `GEARS_VIEWED`,
			})

			return items
		} catch (e) {
			this.logger.error(`Failed to retrieve gear.`, { userId: this.user.uid })
			throw e
		}
	}

	@Post()
	async create(dto: any): Promise<Gear> {
		try {
			this.logger.log(`Creating gear.`, { userId: this.user.uid, item: dto })

			const result = await this.service.add(dto)
			this.logger.log(`Successfully created gear.`, {
				userId: this.user.uid,
				itemId: result.id,
				event: `GEAR_CREATED`,
				result,
			})

			return result
		} catch (e) {
			this.logger.error(`An error occurred adding gear`, {
				userId: this.user.uid,
				item: dto,
			})

			throw e
		}
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		try {
			this.logger.log(`Deleting gear.`, { userId: this.user.uid, itemId: id })

			await this.service.remove(id)
		} catch (e) {
			this.logger.error(`Error deleting gear.`, {
				userId: this.user.uid,
				itemId: id,
			})

			throw e
		}
	}
}
