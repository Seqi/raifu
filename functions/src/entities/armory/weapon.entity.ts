import { Entity } from '@mikro-orm/core'
import { Armory } from './armory.entity'

@Entity({ tableName: 'weapons' })
export class Weapon extends Armory {}
