import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { Loadout, LoadoutWeapon, Weapon } from 'src/entities'
import { UserService } from 'src/auth'
import { InjectResourceService, ResourceService } from '../../resource'

@Injectable()
export class LoadoutWeaponService {
	constructor(
		@InjectRepository(LoadoutWeapon) private em: EntityRepository<LoadoutWeapon>,
		@InjectRepository(Loadout) private loadoutRepository: EntityRepository<Loadout>,
		@InjectResourceService(Weapon) private weapons: ResourceService<Weapon>,
		private user: UserService,
	) {}

	async add(loadoutId: string, weaponId: string) {
		const weapon = await this.weapons.getById(weaponId)
		if (!weapon) {
			throw new NotFoundException('Weapon not found.')
		}

		const loadout = await this.loadoutRepository.findOne({
			id: loadoutId,
			uid: this.user.uid,
		})

		if (!loadout) {
			throw new NotFoundException('Loadout not found.')
		}

		// Ensure the combo doesnt exist yet
		const exists = (await this.em.count({ loadout: { id: loadoutId }, weapon: { id: weaponId } })) > 0
		if (exists) {
			throw new ConflictException('Weapon already exists on loadout.')
		}

		loadout.weapons.add(new LoadoutWeapon(loadout, weapon))
		this.em.flush()
	}

	async delete(loadoutId: string, weaponId: string): Promise<boolean> {
		const result = await this.em.nativeDelete({
			loadout: {
				id: loadoutId,
				uid: this.user.uid,
			},
			weapon: {
				id: weaponId,
			},
		})

		return result > 0
	}
}
