import CloudFunction from '../cloud-function'

import base from '../base-entity'
import loadoutWeapons from './loadout-weapons'
import loadoutGear from './loadout-gear'
import loadoutClothing from './loadout-clothing'

const loadouts = {
	...base('loadouts'),
	loadout: (loadoutId) => ({
		share: (isShared) => new CloudFunction()
			.path(`/loadouts/${loadoutId}/share`)
			.post({ shared: isShared }),
		weapons: loadoutWeapons(loadoutId),
		gear: loadoutGear(loadoutId),
		clothing: loadoutClothing(loadoutId)
	})
}

export default loadouts