import { DynamicModule, Logger, Module, Type, Provider, Global } from '@nestjs/common'

import { Armory } from 'src/entities'
import { createResourceController } from './resource.controller'
import { createResourceServiceToken } from './tokens'
import { createResourceService } from './resource.service'

export type ResourceConfig<TResource extends Armory> =
	| Type<TResource>
	| { entity: Type<TResource>; route: string }

@Global()
@Module({})
export class ResourceModule {
	static forRoot<TResource extends Armory>(resources: ResourceConfig<TResource>[]): DynamicModule {
		const controllers = resources.map((resource) => {
			if (typeof resource === 'function') {
				return createResourceController(resource, resource.name.toLowerCase())
			} else {
				return createResourceController(resource.entity, resource.route)
			}
		})

		const services = resources.map((resource) => {
			return {
				provide: createResourceServiceToken(typeof resource === 'function' ? resource : resource.entity),
				useClass: createResourceService(typeof resource === 'function' ? resource : resource.entity),
			} as Provider
		})

		return {
			module: ResourceModule,
			controllers: [...controllers],
			providers: [...services, Logger],
			exports: [...services],
		}
	}
}
