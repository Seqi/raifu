import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { Clothing, LoadoutClothing } from 'src/entities'
import { FirebaseUserService } from 'src/firebase'
import { InjectResourceService, ResourceService } from '../resource'
import { LoadoutService } from './loadout.service'

@Injectable()
export class LoadoutClothingService {
	constructor(
		@InjectRepository(LoadoutClothing) private em: EntityRepository<LoadoutClothing>,
		@InjectResourceService(Clothing) private clothing: ResourceService<Clothing>,
		private loadouts: LoadoutService,
		private user: FirebaseUserService,
	) {}

	async add(loadoutId: string, clothingId: string) {
		const clothing = await this.clothing.getById(clothingId)
		if (!clothing) {
			throw new NotFoundException('Clothing not found.')
		}

		// TODO: Move to different query? Full fat fetch atm
		const loadout = await this.loadouts.getById(loadoutId)
		if (!loadout) {
			throw new NotFoundException('Loadout not found.')
		}

		// Ensure the combo doesnt exist yet
		const exists = (await this.em.count({ loadout: { id: loadoutId }, clothing: { id: clothingId } })) > 0
		if (!exists) {
			throw new ConflictException('Clothing already exists on loadout.')
		}

		loadout.clothing.add(new LoadoutClothing(loadout, clothing))
		this.em.flush()
	}

	async delete(loadoutId: string, clothingId: string): Promise<boolean> {
		const result = await this.em.nativeDelete({
			loadout: {
				id: loadoutId,
				uid: this.user.uid,
			},
			clothing: {
				id: clothingId,
			},
		})

		return result > 0
	}
}
