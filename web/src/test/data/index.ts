import { get as getLoadouts } from './loadouts'
import { getArmory, getWeapons, getAttachments, getGear, getClothing } from './armory'

export const db = {
	loadouts: { get: getLoadouts },
	armory: {
		get: getArmory,
		weapons: {
			get: getWeapons,
		},
		attachments: {
			get: getAttachments,
		},
		gear: {
			get: getGear,
		},
		clothing: {
			get: getClothing,
		},
	},
}
