import base from '../base-entity'
import loadoutWeapons from './loadout-weapons'
import loadoutGear from './loadout-gear'

export default () => {
	return {
		...base('loadouts'),
		loadout: (loadoutId) => ({
			weapons: loadoutWeapons(loadoutId),
			gear: loadoutGear(loadoutId)
		})
	}
}
