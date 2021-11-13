import { PrimaryKey, Property } from '@mikro-orm/core'

export abstract class Armory {
	@PrimaryKey({ length: 14 })
	id!: string

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

	@Property({ length: 32 })
	uid!: string

	@Property({ fieldName: 'createdAt', length: 6 })
	createdAt!: Date

	@Property({ fieldName: 'updatedAt', length: 6 })
	updatedAt!: Date
}
