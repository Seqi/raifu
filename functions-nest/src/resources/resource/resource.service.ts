import { Injectable, Type } from '@nestjs/common'
import { EntityManager, QueryOrder } from '@mikro-orm/core'

import { UserService } from 'src/auth'
import { Armory } from 'src/entities'
import { CreateResourceDto } from './resource.dto'

export interface ResourceService<TResource extends Armory> {
	getAll(): Promise<TResource[]>
	getById(id: string): Promise<TResource>
	create(dto: any): Promise<TResource>
	delete(id: string): Promise<void>
}

export function createResourceService<TResource extends Armory>(
	resource: Type<TResource>,
): Type<ResourceService<TResource>> {
	@Injectable()
	class _ResourceService implements ResourceService<TResource> {
		constructor(private em: EntityManager, private user: UserService) {}

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

		async getById(id: string): Promise<TResource> {
			const result = await this.em.findOne(resource, {
				id,
				uid: this.user.uid,
			})

			return result
		}

		async create(dto: CreateResourceDto): Promise<TResource> {
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
