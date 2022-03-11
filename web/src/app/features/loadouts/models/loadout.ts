import PropTypes from 'prop-types'

import {
	Attachment,
	Clothing,
	Gear,
	Weapon,
	ArmoryItemPropShape,
} from '../../armory/models/armory-item'
import { Resource, ResourcePropShape } from '../../resource/models/resource'

export interface Loadout extends Resource {
	name: string
	shared: boolean
	weapons: LoadoutWeapon[]
	gear: Gear[]
	clothing: Clothing[]
}

export interface LoadoutWeapon extends Weapon {
	attachments: Attachment[]
}

export const LoadoutPropType = {
	...ResourcePropShape,

	name: PropTypes.string.isRequired,
	shared: PropTypes.bool.isRequired,
	weapons: PropTypes.array.isRequired,
	gear: PropTypes.array.isRequired,
	clothing: PropTypes.array.isRequired,
}

export const LoadoutWeaponPropType = {
	...ArmoryItemPropShape,
	attachments: PropTypes.arrayOf(PropTypes.shape(ArmoryItemPropShape).isRequired)
		.isRequired,
}
