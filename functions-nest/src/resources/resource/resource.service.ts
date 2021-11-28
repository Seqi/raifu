import { Injectable, Type } from '@nestjs/common'
import { EntityManager, QueryOrder } from '@mikro-orm/core'

import { FirebaseUserService } from 'src/firebase/services/firebase-user.service'
import { Armory } from 'src/entities'

export interface ResourceServiceLike<TResource extends Armory> {
	getAll(): Promise<TResource[]>
	create(dto: any): Promise<TResource>
	delete(id: string): Promise<void>
}

export type ResourceService<TResource extends Armory> = Type<ResourceServiceLike<TResource>>

export function createResourceService<TResource extends Armory>(
	resource: Type<TResource>,
): ResourceService<TResource> {
	@Injectable()
	class _ResourceService implements ResourceServiceLike<TResource> {
		constructor(private em: EntityManager, private user: FirebaseUserService) {}

		async getAll(): Promise<TResource[]> {
			// TODO: Remove uid from result
			const result = await this.em.find(
				resource,
				{
					uid: this.user.uid,
				},
				{
					orderBy: { createdAt: QueryOrder.ASC },
				},
			)

			return result
		}

		async create(dto: any): Promise<TResource> {
			// TODO: Validate no id being sent in at controller
			const newEntity = this.em.create(resource, { uid: this.user.uid, ...dto })
			this.em.persistAndFlush(newEntity)

			return newEntity
		}

		async delete(id: string): Promise<void> {
			this.em.nativeDelete<Armory>(resource, {
				id: id,
				uid: this.user.uid,
			})
		}
	}

	return _ResourceService
}
