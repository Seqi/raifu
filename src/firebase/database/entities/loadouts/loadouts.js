import base from '../base-entity'
import loadoutWeapons from './loadout-weapons'

export default () => {
	return {
		...base('loadouts'),
		loadout: (loadoutId) => ({
			weapons: loadoutWeapons(loadoutId)
		})
	}
}
