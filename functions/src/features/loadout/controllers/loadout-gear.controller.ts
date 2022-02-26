import { Controller, Delete, Inject, Logger, LoggerService, Param, Post } from '@nestjs/common'
import { UserService } from 'src/auth'
import { LoadoutGearService } from '../services/loadout-gear.service'

@Controller('loadouts/:loadoutId/gear')
export class LoadoutGearController {
	constructor(
		private loadoutGear: LoadoutGearService,
		private user: UserService,
		@Inject(Logger) private logger: LoggerService,
	) {}

	@Post(':gearId')
	async create(@Param('loadoutId') loadoutId: string, @Param('gearId') gearId: string) {
		this.logger.log({ message: 'Adding gear to loadout.', userId: this.user.uid, gearId: gearId, loadoutId })

		try {
			const gear = await this.loadoutGear.add(loadoutId, gearId)

			this.logger.log({
				message: 'Successfully added gear to loadout.',
				userId: this.user.uid,
				gearId: gearId,
				loadoutId,
				event: 'LOADOUT_ADD_GEAR',
			})

			return gear
		} catch (e) {
			this.logger.error({
				message: 'Error adding gear to loadout.',
				userId: this.user.uid,
				gearId: gearId,
				loadoutId,
			})

			throw e
		}
	}

	@Delete(':gearId')
	async delete(@Param('loadoutId') loadoutId: string, @Param('gearId') gearId: string) {
		this.logger.log({ message: 'Removing gear from loadout.', userId: this.user.uid, gearId, loadoutId })

		try {
			await this.loadoutGear.delete(loadoutId, gearId)

			this.logger.log({
				message: 'Successfully removed gear from loadout.',
				userId: this.user.uid,
				gearId,
				loadoutId,
				event: 'LOADOUT_REMOVE_GEAR',
			})
		} catch (e) {
			this.logger.error({
				message: 'Error removing gear from loadout.',
				userId: this.user.uid,
				gearId,
				loadoutId,
			})

			throw e
		}
	}
}
