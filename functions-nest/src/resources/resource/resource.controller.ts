import { Controller, Delete, Get, Inject, Logger, LoggerService, Param, Post, Type } from '@nestjs/common'

import { Armory } from 'src/entities'
import { FirebaseUserService } from 'src/firebase'
import { InjectResourceService } from './tokens'
import { ResourceServiceLike } from './resource.service'

export interface ResourceController<TResource extends Armory> {
	getAll(): Promise<TResource[]>
	create(dto: any): Promise<TResource>
	delete(id: string): Promise<void>
}

export type ResourceControllerClass<TResource extends Armory> = Type<ResourceController<TResource>>

export function createResourceController<TResource extends Armory>(
	resource: Type<TResource>,
	route = resource.name,
): ResourceControllerClass<TResource> {
	class _ResourceController implements ResourceController<TResource> {
		constructor(
			private user: FirebaseUserService,
			@InjectResourceService(resource) private service: ResourceServiceLike<TResource>,
			@Inject(Logger) private logger: LoggerService,
		) {}

		@Get()
		async getAll(): Promise<TResource[]> {
			try {
				this.logger.log(`Retrieving Resources`, { userId: this.user.uid })

				const items = await this.service.getAll()

				this.logger.log(`Successfuly retrieved ${items.length} Resources`, {
					userId: this.user.uid,
					event: `ResourceS_VIEWED`,
				})

				return items
			} catch (e) {
				this.logger.error(`Failed to retrieve Resources.`, { userId: this.user.uid })
				throw e
			}
		}

		@Post()
		async create(dto: any): Promise<TResource> {
			try {
				this.logger.log(`Creating Resource.`, { userId: this.user.uid, item: dto })

				const result = await this.service.create(dto)
				this.logger.log(`Successfully created Resource.`, {
					userId: this.user.uid,
					itemId: result.id,
					event: `Resource_CREATED`,
					result,
				})

				return result
			} catch (e) {
				this.logger.error(`An error occurred adding Resource`, {
					userId: this.user.uid,
					item: dto,
				})

				throw e
			}
		}

		@Delete(':id')
		async delete(@Param('id') id: string) {
			try {
				this.logger.log(`Deleting Resource.`, { userId: this.user.uid, itemId: id })

				await this.service.delete(id)
			} catch (e) {
				this.logger.error(`Error deleting Resource.`, {
					userId: this.user.uid,
					itemId: id,
				})

				throw e
			}
		}
	}

	Controller(route)(_ResourceController)

	return _ResourceController
}
