import armory from './armory/armory'
import loadouts from './loadouts/loadouts'
import events from './events/events'
import brands from '../constants/brands'
import platforms from '../constants/platforms'

import base from './entities/base-entity'

import ArmoryItem from '../models/armory-item.model'

export default {
	armory,
	weapons: base('weapons', ArmoryItem),
	attachments: base('attachments', ArmoryItem),
	gear: base('gear', ArmoryItem),
	clothing: base('clothing', ArmoryItem),
	loadouts,
	events,
	brands,
	platforms: {
		weapon: platforms.weapons,
		gear: platforms.gear,
		attachment: platforms.attachments,
		clothing: platforms.clothing
	}
}
