import { Controller, Delete, Inject, Logger, LoggerService, Param, Post } from '@nestjs/common'
import { UserService } from 'src/auth'
import { LoadoutWeaponService } from '../services/loadout-weapon.service'

@Controller('loadouts/:loadoutId/weapons')
export class LoadoutWeaponController {
	constructor(
		private loadoutWeapons: LoadoutWeaponService,
		private user: UserService,
		@Inject(Logger) private logger: LoggerService,
	) {}

	@Post(':weaponId')
	async create(@Param('loadoutId') loadoutId: string, @Param('weaponId') weaponId: string) {
		this.logger.log({ message: 'Adding weapon to loadout.', userId: this.user.uid, weaponId, loadoutId })

		try {
			await this.loadoutWeapons.add(loadoutId, weaponId)

			this.logger.log({
				message: 'Successfully added weapon to loadout.',
				userId: this.user.uid,
				weaponId,
				loadoutId,
				event: 'LOADOUT_ADD_WEAPON',
			})
		} catch (e) {
			this.logger.error({
				message: 'Error adding weapon to loadout.',
				userId: this.user.uid,
				weaponId,
				loadoutId,
			})

			throw e
		}
	}

	@Delete(':weaponId')
	async delete(@Param('loadoutId') loadoutId: string, @Param('weaponId') weaponId: string) {
		this.logger.log({ message: 'Removing weapon from loadout.', userId: this.user.uid, weaponId, loadoutId })

		try {
			await this.loadoutWeapons.delete(loadoutId, weaponId)

			this.logger.log({
				message: 'Successfully removed weapon from loadout.',
				userId: this.user.uid,
				weaponId,
				loadoutId,
				event: 'LOADOUT_REMOVE_WEAPON',
			})
		} catch (e) {
			this.logger.error({
				message: 'Error removing weapon from loadout.',
				userId: this.user.uid,
				weaponId,
				loadoutId,
			})

			throw e
		}
	}
}
