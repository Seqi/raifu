import base from '../base-entity'
import loadoutWeapons from './loadout-weapons'
import loadoutGear from './loadout-gear'
import loadoutClothing from './loadout-clothing'

import Loadout from '../models/loadout.model'

export default {
	...base('loadouts', Loadout),
	loadout: (loadoutId) => ({
		weapons: loadoutWeapons(loadoutId),
		gear: loadoutGear(loadoutId),
		clothing: loadoutClothing(loadoutId)
	})
}
