import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { nanoid } from 'nanoid'

@Entity({ abstract: true })
export abstract class BaseEntity {
	@PrimaryKey({ length: 14 })
	id: string = nanoid(14)

	@Property({ fieldName: 'createdAt', length: 6 })
	createdAt: Date = new Date()

	@Property({ fieldName: 'updatedAt', length: 6 })
	updatedAt: Date = new Date()
}

export abstract class UserBaseEntity extends BaseEntity {
	@Property({ length: 32 })
	uid!: string
}
