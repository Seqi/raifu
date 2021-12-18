import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository, QueryOrder } from '@mikro-orm/core'

import { UserService } from 'src/auth'
import { Loadout } from './models'
import { CreateLoadoutDto, UpdateLoadoutDto } from './loadout.dto'

@Injectable()
export class LoadoutService {
	constructor(
		@InjectRepository(Loadout)
		private repo: EntityRepository<Loadout>,
		private user: UserService,
	) {}

	async getAll(): Promise<Loadout[]> {
		// TODO: Remove uid from result
		const result = await this.repo.find(
			{
				uid: this.user.uid,
			},
			{
				orderBy: { createdAt: QueryOrder.ASC },
				populate: { weapons: true },
			},
		)

		return result
	}

	async getById(id: string): Promise<Loadout> {
		// TODO: Remove uid from result
		const result = await this.repo.findOne(
			{
				id,
				$or: [{ uid: this.user.uid }, { shared: true }],
			},
			{
				weapons: {
					attachments: true,
				},
				clothing: true,
				gear: true,
			},
		)

		return result
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
		this.repo.flush()
	}

	async remove(id: string): Promise<void> {
		const ref = this.repo.getReference(id)
		await this.repo.removeAndFlush(ref)
	}
}
