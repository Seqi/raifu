import { Injectable } from '@nestjs/common'
import { EntityRepository, QueryOrder } from '@mikro-orm/core'

import { FirebaseUserService } from 'src/firebase/services/firebase-user.service'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Clothing } from '../models'

@Injectable()
export class ClothingService {
	constructor(
		@InjectRepository(Clothing)
		private repo: EntityRepository<Clothing>,
		private user: FirebaseUserService,
	) {}

	async getAll(): Promise<Clothing[]> {
		// TODO: Remove uid from result
		const result = await this.repo.find(
			{
				uid: this.user.uid,
			},
			{
				orderBy: { createdAt: QueryOrder.ASC },
			},
		)

		return result
	}

	async add(dto: any): Promise<Clothing> {
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
