import armory from './entities/armory/armory'
import loadouts from './entities/loadouts/loadouts'
import events from './entities/events/events'
import brands from './entities/lookups/brands'
import platforms from './entities/lookups/platforms'

import base from './entities/base-entity'

export default {
	armory,
	weapons: base('weapons'),
	attachments: base('attachments'),
	gear: base('gear'),
	clothing: base('clothing'),
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
