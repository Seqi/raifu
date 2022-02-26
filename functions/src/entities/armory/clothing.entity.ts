import { Entity } from '@mikro-orm/core'
import { Armory } from './armory.entity'

@Entity()
export class Clothing extends Armory {}
