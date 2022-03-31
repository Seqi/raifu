import PropTypes from 'prop-types'

import { Resource, ResourcePropShape } from 'app/features/resource'

export type ArmoryCollection = {
	weapons: Weapon[]
	attachments: Attachment[]
	gear: Gear[]
	clothing: Clothing[]
}

export interface ArmoryItem extends Resource {
	type: string
	platform: string
	brand?: string | null
	model?: string | null
	nickname?: string | null
}

export const ArmoryItemPropShape = {
	...ResourcePropShape,
	type: PropTypes.string.isRequired,
	platform: PropTypes.string.isRequired,
	brand: PropTypes.string,
	model: PropTypes.string,
	nickname: PropTypes.string,
}

export type Weapon = ArmoryItem
export type Attachment = ArmoryItem
export type Gear = ArmoryItem
export type Clothing = ArmoryItem
