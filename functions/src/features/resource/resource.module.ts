import { DynamicModule, Logger, Module, Type, Provider, Global } from '@nestjs/common'

import { Armory } from 'src/entities'
import { createResourceController } from './resource.controller'
import { createResourceServiceToken } from './tokens'
import { createResourceService } from './resource.service'
import { MikroOrmModule } from '@mikro-orm/nestjs'

export type ResourceConfig<TResource extends Armory> =
	| Type<TResource>
	| { entity: Type<TResource>; route: string }

@Global()
@Module({})
export class ResourceModule {
	static forRoot<TResource extends Armory>(resources: ResourceConfig<TResource>[]): DynamicModule {
		const entities = resources.map((resource) =>
			typeof resource === 'function' ? resource : resource.entity,
		)

		const controllers = resources.map((resource) => {
			if (typeof resource === 'function') {
				return createResourceController(resource, resource.name.toLowerCase())
			} else {
				return createResourceController(resource.entity, resource.route)
			}
		})

		const services = entities.map((entity) => {
			return {
				provide: createResourceServiceToken(entity),
				useClass: createResourceService(entity),
			} as Provider
		})

		return {
			module: ResourceModule,
			imports: [MikroOrmModule.forFeature(entities)],
			controllers: [...controllers],
			providers: [...services, Logger],
			exports: [...services],
		}
	}
}
