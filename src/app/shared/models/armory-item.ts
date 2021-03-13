import { Resource } from './resource'

export interface ArmoryItem extends Resource {
	type: string
	platform: string
	brand?: string | null
	model?: string | null
	nickname?: string | null
}

export interface Weapon extends ArmoryItem {}
export interface Attachment extends ArmoryItem {}
export interface Gear extends ArmoryItem {}
export interface Clothing extends ArmoryItem {}

export type Category = 'weapons' | 'attachments' | 'gear' | 'clothing'
