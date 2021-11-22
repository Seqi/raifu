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
import { Weapon } from 'src/entities'
import { FirebaseUserService } from 'src/firebase'
import { WeaponService } from '../services'

@Controller('weapons')
export class WeaponController {
	constructor(
		private service: WeaponService,
		private user: FirebaseUserService,
		@Inject(Logger) private logger: LoggerService,
	) {}

	@Get()
	async getAll(): Promise<Weapon[]> {
		try {
			this.logger.log(`Retrieving weapons`, { userId: this.user.uid })

			const items = await this.service.getAll()

			this.logger.log(`Successfuly retrieved ${items.length} weapons`, {
				userId: this.user.uid,
				event: `WEAPONS_VIEWED`,
			})

			return items
		} catch (e) {
			this.logger.error(`Failed to retrieve weapons.`, { userId: this.user.uid })
			throw e
		}
	}

	@Post()
	async create(dto: any): Promise<Weapon> {
		try {
			this.logger.log(`Creating weapon.`, { userId: this.user.uid, item: dto })

			const result = await this.service.add(dto)
			this.logger.log(`Successfully created weapon.`, {
				userId: this.user.uid,
				itemId: result.id,
				event: `WEAPON_CREATED`,
				result,
			})

			return result
		} catch (e) {
			this.logger.error(`An error occurred adding weapon`, {
				userId: this.user.uid,
				item: dto,
			})

			throw e
		}
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		try {
			this.logger.log(`Deleting weapon.`, { userId: this.user.uid, itemId: id })

			await this.service.remove(id)
		} catch (e) {
			this.logger.error(`Error deleting weapon.`, {
				userId: this.user.uid,
				itemId: id,
			})

			throw e
		}
	}
}
