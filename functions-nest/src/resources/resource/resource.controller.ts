import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Logger,
	LoggerService,
	Param,
	Post,
	Type,
} from '@nestjs/common'

import { Armory } from 'src/entities'
import { UserService } from 'src/auth'
import { InjectResourceService } from './tokens'
import { ResourceService } from './resource.service'
import { CreateResourceDto } from './resource.dto'

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
	const RESOURCE_NAME = resource.name.toLowerCase()
	const RESOURCE_NAME_UPPER = RESOURCE_NAME.toUpperCase()

	class _ResourceController implements ResourceController<TResource> {
		constructor(
			private user: UserService,
			@InjectResourceService(resource) private service: ResourceService<TResource>,
			@Inject(Logger) private logger: LoggerService,
		) {}

		@Get()
		async getAll(): Promise<TResource[]> {
			try {
				this.logger.log({ message: `Retrieving ${RESOURCE_NAME}.`, userId: this.user.uid })

				const items = await this.service.getAll()

				this.logger.log({
					message: `Successfuly retrieved ${items.length} ${RESOURCE_NAME}.`,
					userId: this.user.uid,
					event: `${RESOURCE_NAME_UPPER}_VIEWED`,
				})

				return items
			} catch (e) {
				this.logger.error({ message: `Failed to retrieve ${RESOURCE_NAME}.`, userId: this.user.uid })
				throw e
			}
		}

		@Post()
		async create(@Body() dto: CreateResourceDto): Promise<TResource> {
			try {
				this.logger.log({
					message: `Creating ${RESOURCE_NAME}.`,
					userId: this.user.uid,
					item: dto,
				})

				const result = await this.service.create(dto)

				this.logger.log({
					message: `Successfully created ${RESOURCE_NAME}.`,
					userId: this.user.uid,
					itemId: result.id,
					event: `${RESOURCE_NAME_UPPER}_CREATED`,
					result,
				})

				return result
			} catch (e) {
				this.logger.error({
					message: `An error occurred adding ${RESOURCE_NAME}.`,
					userId: this.user.uid,
					item: dto,
				})

				throw e
			}
		}

		@Delete(':id')
		async delete(@Param('id') id: string) {
			try {
				this.logger.log({ message: `Deleting ${RESOURCE_NAME}.`, userId: this.user.uid, itemId: id })

				await this.service.delete(id)

				this.logger.log(`Successfully deleted ${RESOURCE_NAME}.`, {
					userId: this.user.uid,
					itemId: id,
					event: `${RESOURCE_NAME_UPPER}_DELETED`,
				})
			} catch (e) {
				this.logger.error({
					message: `An error occurred deleting ${RESOURCE_NAME}.`,
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
