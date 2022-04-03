import faker from '@faker-js/faker'
import { build, oneOf, perBuild } from '@jackfranklin/test-data-bot'
import { platforms } from 'app/data/constants'
import { Attachment } from 'app/features/armory'

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

export const buildAttachment = build<Attachment>({
	fields: {
		id: perBuild(() => faker.datatype.string(14)),
		createdAt: perBuild(() => faker.date.recent()),
		updatedAt: perBuild(() => faker.date.recent()),
		platform: oneOf(...platforms.attachments.sights),
		type: 'sights',
		getTitle: perBuild(() => () => ''),
		getSubtitle: perBuild(() => () => ''),
	},
	postBuild: (weapon) => {
		weapon.getTitle = () => weapon.platform
		return weapon
	},
})

export const buildLoadoutWeapon = build<LoadoutWeapon>({
	fields: {
		id: perBuild(() => faker.datatype.string(14)),
		createdAt: perBuild(() => faker.date.recent()),
		updatedAt: perBuild(() => faker.date.recent()),
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
