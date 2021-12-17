import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { LoadoutGear, Gear } from 'src/entities'
import { FirebaseUserService } from 'src/firebase'
import { InjectResourceService, ResourceService } from '../resource'
import { LoadoutService } from './loadout.service'

@Injectable()
export class LoadoutGearService {
	constructor(
		@InjectRepository(LoadoutGear) private em: EntityRepository<LoadoutGear>,
		@InjectResourceService(Gear) private gears: ResourceService<Gear>,
		private loadouts: LoadoutService,
		private user: FirebaseUserService,
	) {}

	async add(loadoutId: string, gearId: string) {
		const gear = await this.gears.getById(gearId)
		if (!gear) {
			throw new NotFoundException('Gear not found.')
		}

		// TODO: Move to different query? Full fat fetch atm
		const loadout = await this.loadouts.getById(loadoutId)
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
