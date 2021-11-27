import { DynamicModule, Logger, Module, Type, Provider } from '@nestjs/common'

import { Armory } from 'src/entities'
import { createResourceController } from './resource.controller'
import { createResourceServiceToken } from './tokens'
import { createResourceService } from './resource.service'

@Module({})
export class ResourceModule {
	static forRoot<TResource extends Armory>(resources: Type<TResource>[]): DynamicModule {
		const controllers = resources.map((resource) =>
			createResourceController(resource, resource.name.toLowerCase()),
		)

		const services = resources.map((resource) => {
			return {
				provide: createResourceServiceToken(resource),
				useClass: createResourceService(resource),
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
