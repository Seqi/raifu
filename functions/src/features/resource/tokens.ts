import { Inject, Type } from '@nestjs/common'
import { Armory } from 'src/entities'

export const createResourceServiceToken = (resource: Type<Armory>) => `${resource.name}ServiceToken`

export const InjectResourceService = (resource: Type<Armory>) => Inject(createResourceServiceToken(resource))
