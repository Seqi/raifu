import { Controller, Delete, Inject, Logger, LoggerService, Param, Post } from '@nestjs/common'
import { UserService } from 'src/auth'
import { LoadoutClothingService } from './loadout-clothing.service'

@Controller('loadouts/:loadoutId/clothing')
export class LoadoutClothingController {
	constructor(
		private loadoutClothing: LoadoutClothingService,
		private user: UserService,
		@Inject(Logger) private logger: LoggerService,
	) {}

	@Post(':clothingId')
	async create(@Param('loadoutId') loadoutId: string, @Param('clothingId') clothingId: string) {
		this.logger.log({
			message: 'Adding clothing to loadout.',
			userId: this.user.uid,
			clothingId: clothingId,
			loadoutId,
		})

		try {
			await this.loadoutClothing.add(loadoutId, clothingId)

			this.logger.log({
				message: 'Successfully added clothing to loadout.',
				userId: this.user.uid,
				clothingId: clothingId,
				loadoutId,
				event: 'LOADOUT_ADD_CLOTHING',
			})
		} catch (e) {
			this.logger.error({
				message: 'Error adding clothing to loadout.',
				userId: this.user.uid,
				clothingId: clothingId,
				loadoutId,
			})

			throw e
		}
	}

	@Delete(':clothingId')
	async delete(@Param('loadoutId') loadoutId: string, @Param('clothingId') clothingId: string) {
		this.logger.log({
			message: 'Removing clothing from loadout.',
			userId: this.user.uid,
			clothingId,
			loadoutId,
		})

		try {
			await this.loadoutClothing.delete(loadoutId, clothingId)

			this.logger.log({
				message: 'Successfully removed clothing from loadout.',
				userId: this.user.uid,
				clothingId,
				loadoutId,
				event: 'LOADOUT_REMOVE_CLOTHING',
			})
		} catch (e) {
			this.logger.error({
				message: 'Error removing clothing from loadout.',
				userId: this.user.uid,
				clothingId,
				loadoutId,
			})

			throw e
		}
	}
}
