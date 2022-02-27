import { Injectable } from '@nestjs/common'

import { Attachment, Clothing, Gear, Weapon } from 'src/entities'
import { ResourceService, InjectResourceService } from '../resource'
import { ArmoryDto } from './armory.dto'

@Injectable()
export class ArmoryService {
	constructor(
		@InjectResourceService(Weapon) private weaponService: ResourceService<Weapon>,
		@InjectResourceService(Attachment) private attachmentService: ResourceService<Attachment>,
		@InjectResourceService(Gear) private gearService: ResourceService<Gear>,
		@InjectResourceService(Clothing) private clothingService: ResourceService<Clothing>,
	) {}

	async findAll(): Promise<ArmoryDto> {
		return {
			weapons: await this.weaponService.getAll(),
			attachments: await this.attachmentService.getAll(),
			gear: await this.gearService.getAll(),
			clothing: await this.clothingService.getAll(),
		}
	}
}
