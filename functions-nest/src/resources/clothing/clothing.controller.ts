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

import { Clothing } from 'src/entities'
import { FirebaseUserService } from 'src/firebase'
import { ClothingService } from './clothing.service'

@Controller('clothing')
export class ClothingController {
	constructor(
		private service: ClothingService,
		private user: FirebaseUserService,
		@Inject(Logger) private logger: LoggerService,
	) {}

	@Get()
	async getAll(): Promise<Clothing[]> {
		try {
			this.logger.log(`Retrieving clothing`, { userId: this.user.uid })

			const items = await this.service.getAll()

			this.logger.log(`Successfuly retrieved ${items.length} clothing`, {
				userId: this.user.uid,
				event: `CLOTHING_VIEWED`,
			})

			return items
		} catch (e) {
			this.logger.error(`Failed to retrieve clothing.`, { userId: this.user.uid })
			throw e
		}
	}

	@Post()
	async create(dto: any): Promise<Clothing> {
		try {
			this.logger.log(`Creating clothing.`, { userId: this.user.uid, item: dto })

			const result = await this.service.add(dto)
			this.logger.log(`Successfully created clothing.`, {
				userId: this.user.uid,
				itemId: result.id,
				event: `CLOTHING_CREATED`,
				result,
			})

			return result
		} catch (e) {
			this.logger.error(`An error occurred adding clothing`, {
				userId: this.user.uid,
				item: dto,
			})

			throw e
		}
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		try {
			this.logger.log(`Deleting clothing.`, { userId: this.user.uid, itemId: id })

			await this.service.remove(id)
		} catch (e) {
			this.logger.error(`Error deleting clothing.`, {
				userId: this.user.uid,
				itemId: id,
			})

			throw e
		}
	}
}
