import faker from '@faker-js/faker'
import { build, oneOf, perBuild } from '@jackfranklin/test-data-bot'
import { platforms } from 'app/data/constants'

import { Loadout, LoadoutWeapon } from '../../app/features/loadouts/models'

export const buildLoadout = build<Loadout>({
	fields: {
		id: perBuild(() => faker.datatype.string(14)),
		createdAt: perBuild(() => faker.date.recent().toISOString()),
		updatedAt: perBuild(() => faker.date.recent().toISOString()),
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
		createdAt: perBuild(() => faker.date.recent().toISOString()),
		updatedAt: perBuild(() => faker.date.recent().toISOString()),
		platform: oneOf(...platforms.weapons.rifles),
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
