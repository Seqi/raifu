import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository, QueryOrder } from '@mikro-orm/core'

import { UserService } from 'src/auth'
import { Loadout } from '../models'
import { CreateLoadoutDto, UpdateLoadoutDto, ViewLoadoutDto, ViewLoadoutWeaponDto } from '../loadout.dto'

@Injectable()
export class LoadoutService {
	constructor(
		@InjectRepository(Loadout)
		private repo: EntityRepository<Loadout>,
		private user: UserService,
	) {}

	async getAll(): Promise<ViewLoadoutDto[]> {
		// TODO: Remove uid from result
		const loadouts = await this.repo.find(
			{
				uid: this.user.uid,
			},
			{
				orderBy: { createdAt: QueryOrder.ASC },
				populate: { weapons: { weapon: true } },
			},
		)

		const loadoutDtos = loadouts.map(ViewLoadoutDto.fromLoadout)
		return loadoutDtos
	}

	async getById(id: string): Promise<ViewLoadoutDto> {
		// TODO: Remove uid from result
		const loadout = await this.repo.findOne(
			{
				id,
				$or: [{ uid: this.user.uid }, { shared: true }],
			},
			{
				populate: {
					weapons: {
						weapon: true,
						attachments: {
							attachment: true,
						},
					},
					gear: { gear: true },
					clothing: { clothing: true },
				},
			},
		)

		if (!loadout) {
			return null
		}

		return ViewLoadoutDto.fromLoadout(loadout)
	}

	async add(dto: CreateLoadoutDto): Promise<Loadout> {
		// TODO: Validate no id being sent in at controller
		const loadout = this.repo.create({ uid: this.user.uid, ...dto })
		this.repo.persistAndFlush(loadout)

		return loadout
	}

	async update(id: string, dto: UpdateLoadoutDto): Promise<void> {
		const loadout = await this.repo.findOne({ id })

		if (!loadout) {
			throw new NotFoundException()
		}

		Object.apply(loadout, dto)
		await this.repo.flush()
	}

	async remove(id: string): Promise<void> {
		const ref = this.repo.getReference(id)
		await this.repo.removeAndFlush(ref)
	}
}
