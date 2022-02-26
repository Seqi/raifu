import { Entity } from '@mikro-orm/core'
import { Armory } from './armory.entity'

@Entity({ tableName: 'attachments' })
export class Attachment extends Armory {}
