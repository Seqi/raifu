import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { Clothing, Loadout, LoadoutClothing } from 'src/entities'
import { UserService } from 'src/auth'
import { InjectResourceService, ResourceService } from '../../resource'

@Injectable()
export class LoadoutClothingService {
	constructor(
		@InjectRepository(LoadoutClothing) private em: EntityRepository<LoadoutClothing>,
		@InjectResourceService(Clothing) private clothing: ResourceService<Clothing>,
		@InjectRepository(Loadout) private loadoutRepository: EntityRepository<Loadout>,
		private user: UserService,
	) {}

	async add(loadoutId: string, clothingId: string): Promise<Clothing> {
		const clothing = await this.clothing.getById(clothingId)
		if (!clothing) {
			throw new NotFoundException('Clothing not found.')
		}

		const loadout = await this.loadoutRepository.findOne({
			id: loadoutId,
			uid: this.user.uid,
		})

		if (!loadout) {
			throw new NotFoundException('Loadout not found.')
		}

		// Ensure the combo doesnt exist yet
		const exists = (await this.em.count({ loadout: { id: loadoutId }, clothing: { id: clothingId } })) > 0
		if (exists) {
			throw new ConflictException('Clothing already exists on loadout.')
		}

		loadout.clothing.add(new LoadoutClothing(loadout, clothing))
		this.em.flush()

		return clothing
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
