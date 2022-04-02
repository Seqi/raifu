import faker from '@faker-js/faker'
import { build, perBuild } from '@jackfranklin/test-data-bot'

import { Loadout, LoadoutWeapon } from '../models'

export const buildLoadout = build<Loadout>({
	fields: {
		id: perBuild(() => faker.datatype.string(14)),
		createdAt: perBuild(() => faker.date.recent()),
		updatedAt: perBuild(() => faker.date.recent()),
		name: perBuild(() => faker.internet.domainWord()),
		shared: false,
		weapons: [],
		clothing: [],
		gear: [],
		getTitle: perBuild(() => () => ''),
		getSubtitle: perBuild(() => () => ''),
	},
	postBuild: (loadout) => {
		loadout.getTitle = () => loadout.name
		return loadout
	},
})

export const buildLoadoutWeapon = build<LoadoutWeapon>({
	fields: {
		id: perBuild(() => faker.datatype.string(14)),
		createdAt: perBuild(() => faker.date.recent()),
		updatedAt: perBuild(() => faker.date.recent()),
		platform: 'AK47',
		type: 'rifles',
		getTitle: perBuild(() => () => ''),
		getSubtitle: perBuild(() => () => ''),
		attachments: [],
	},
	postBuild: (weapon) => {
		weapon.getTitle = () => weapon.platform
		return weapon
	},
})
