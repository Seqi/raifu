import { Injectable } from '@nestjs/common'
import { EntityRepository, QueryOrder } from '@mikro-orm/core'

import { FirebaseUserService } from 'src/firebase/services/firebase-user.service'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Attachment } from '../models'

@Injectable()
export class AttachmentService {
	constructor(
		@InjectRepository(Attachment)
		private repo: EntityRepository<Attachment>,
		private user: FirebaseUserService,
	) {}

	async getAll(): Promise<Attachment[]> {
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

	async add(dto: any): Promise<Attachment> {
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
