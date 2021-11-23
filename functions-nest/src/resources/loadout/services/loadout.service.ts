import { Injectable } from '@nestjs/common'
import { EntityRepository, QueryOrder } from '@mikro-orm/core'

import { FirebaseUserService } from 'src/firebase/services/firebase-user.service'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Loadout } from '../models'

@Injectable()
export class LoadoutService {
	constructor(
		@InjectRepository(Loadout)
		private repo: EntityRepository<Loadout>,
		private user: FirebaseUserService,
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

	async add(dto: any): Promise<Loadout> {
		// TODO: Validate no id being sent in at controller
		const newEntity = this.repo.create({ uid: this.user.uid, ...dto })
		this.repo.persistAndFlush(newEntity)

		return newEntity
	}

	async remove(id: string): Promise<void> {
		const ref = this.repo.getReference(id)
		await this.repo.removeAndFlush(ref)
	}
}
