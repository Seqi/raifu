import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { LoadoutGear, Gear, Loadout } from 'src/entities'
import { UserService } from 'src/auth'
import { InjectResourceService, ResourceService } from '../../resource'

@Injectable()
export class LoadoutGearService {
	constructor(
		@InjectRepository(LoadoutGear) private em: EntityRepository<LoadoutGear>,
		@InjectResourceService(Gear) private gear: ResourceService<Gear>,
		@InjectRepository(Loadout) private loadoutRepository: EntityRepository<Loadout>,
		private user: UserService,
	) {}

	async add(loadoutId: string, gearId: string) {
		const gear = await this.gear.getById(gearId)
		if (!gear) {
			throw new NotFoundException('Gear not found.')
		}

		const loadout = await this.loadoutRepository.findOne({
			id: loadoutId,
			uid: this.user.uid,
		})

		if (!loadout) {
			throw new NotFoundException('Loadout not found.')
		}

		// Ensure the combo doesnt exist yet
		const exists = (await this.em.count({ loadout: { id: loadoutId }, gear: { id: gearId } })) > 0
		if (!exists) {
			throw new ConflictException('Gear already exists on loadout.')
		}

		loadout.gear.add(new LoadoutGear(loadout, gear))
		this.em.flush()
	}

	async delete(loadoutId: string, gearId: string): Promise<boolean> {
		const result = await this.em.nativeDelete({
			loadout: {
				id: loadoutId,
				uid: this.user.uid,
			},
			gear: {
				id: gearId,
			},
		})

		return result > 0
	}
}
