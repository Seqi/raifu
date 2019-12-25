import weapons from './entities/armory/weapons'
import attachments from './entities/armory/attachments'
import gear from './entities/armory/gear'
import clothing from './entities/armory/clothing'
import loadouts from './entities/loadouts/loadouts'
import events from './entities/events/events'

import brands from './entities/lookups/brands'
import platforms from './entities/lookups/platforms'

export default {
	weapons: weapons(),
	attachments: attachments(),
	gear: gear(),
	clothing: clothing(),
	loadouts: loadouts(),
	events: events(),
	brands: brands,
	platforms: {
		weapon: platforms.weapons,
		gear: platforms.gear,
		attachment: platforms.attachments
	}
}
