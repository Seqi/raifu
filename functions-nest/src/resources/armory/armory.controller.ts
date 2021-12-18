import { Controller, Get, Inject, Logger, LoggerService } from '@nestjs/common'
import { FirebaseAuthGuard } from 'src/auth/firebase.guard'
import { UserService } from 'src/auth'
import { ArmoryDto } from './armory.dto'
import { ArmoryService } from './armory.service'

@FirebaseAuthGuard()
@Controller('armory')
export class ArmoryController {
	constructor(
		@Inject(Logger) private logger: LoggerService,
		private user: UserService,
		private readonly armoryService: ArmoryService,
	) {}

	@Get()
	async findAll(): Promise<ArmoryDto> {
		try {
			this.logger.log({ message: 'Retrieving armory.', userId: this.user.uid })
			const armory = await this.armoryService.findAll()

			this.logger.log({
				message:
					'Retrieved ' +
					`${armory.weapons.length} weapons, ` +
					`${armory.attachments.length} attachments ` +
					`${armory.gear.length} gear ` +
					`${armory.clothing.length} clothing`,
				userId: this.user.uid,
				event: 'ARMORY_LOADED',
				itemCount:
					armory.weapons.length + armory.attachments.length + armory.gear.length + armory.clothing.length,
			})

			return armory
		} catch (e) {
			this.logger.error(e)
			throw e
		}
	}
}
