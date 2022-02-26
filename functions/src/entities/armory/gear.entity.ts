import { Entity } from '@mikro-orm/core'
import { Armory } from './armory.entity'

@Entity()
export class Gear extends Armory {}
