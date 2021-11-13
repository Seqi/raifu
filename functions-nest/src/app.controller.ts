import { EntityManager } from '@mikro-orm/core'
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Loadout } from './entities'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private em: EntityManager) {}

	@Get()
	async getHello() {
		const r = await this.em.find(
			Loadout,
			{},
			{
				populate: ['weapons', 'weapons.attachments'],
			},
		)

		console.log(JSON.stringify(r, null, 2))

		return this.appService.getHello()
	}
}
