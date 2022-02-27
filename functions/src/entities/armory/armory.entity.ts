import { PrimaryKeyType, Property } from '@mikro-orm/core'
import { UserBaseEntity } from '../base.entity'

export abstract class Armory extends UserBaseEntity {
	[PrimaryKeyType]: string

	@Property({ length: 64 })
	platform!: string

	@Property({ length: 64, nullable: true })
	model?: string

	@Property({ length: 64, nullable: true })
	brand?: string

	@Property({ length: 64, nullable: true })
	nickname?: string

	@Property({ length: 16 })
	type!: string
}
