import faker from '@faker-js/faker'
import { perBuild, oneOf, build } from '@jackfranklin/test-data-bot'
import { platforms, brands } from 'app/data/constants'
import { Attachment, Clothing, Gear, Weapon } from 'app/features/armory'

export const buildWeapon = build<Weapon>({
	fields: {
		id: perBuild(() => faker.datatype.string(14)),
		createdAt: perBuild(() => faker.date.recent().toISOString()),
		updatedAt: perBuild(() => faker.date.recent().toISOString()),
		platform: oneOf(...platforms.weapons.rifles),
		brand: oneOf(...brands),
		type: 'rifles',
		getTitle: perBuild(() => () => ''),
		getSubtitle: perBuild(() => () => ''),
	},
	postBuild: (weapon) => {
		weapon.getTitle = () => weapon.platform
		return weapon
	},
})

export const buildAttachment = build<Attachment>({
	fields: {
		id: perBuild(() => faker.datatype.string(14)),
		createdAt: perBuild(() => faker.date.recent().toISOString()),
		updatedAt: perBuild(() => faker.date.recent().toISOString()),
		platform: oneOf(...platforms.attachments.sights),
		brand: oneOf(...brands),
		type: 'sights',
		getTitle: perBuild(() => () => ''),
		getSubtitle: perBuild(() => () => ''),
	},
	postBuild: (attachment) => {
		attachment.getTitle = () => attachment.platform
		return attachment
	},
})

export const buildGear = build<Gear>({
	fields: {
		id: perBuild(() => faker.datatype.string(14)),
		createdAt: perBuild(() => faker.date.recent().toISOString()),
		updatedAt: perBuild(() => faker.date.recent().toISOString()),
		platform: oneOf(...platforms.gear.protection),
		brand: oneOf(...brands),
		type: 'protection',
		getTitle: perBuild(() => () => ''),
		getSubtitle: perBuild(() => () => ''),
	},
	postBuild: (gear) => {
		gear.getTitle = () => gear.platform
		return gear
	},
})

export const buildClothing = build<Clothing>({
	fields: {
		id: perBuild(() => faker.datatype.string(14)),
		createdAt: perBuild(() => faker.date.recent().toISOString()),
		updatedAt: perBuild(() => faker.date.recent().toISOString()),
		platform: oneOf(...platforms.clothing.jackets),
		brand: oneOf(...brands),
		type: 'jackets',
		getTitle: perBuild(() => () => ''),
		getSubtitle: perBuild(() => () => ''),
	},
	postBuild: (clothing) => {
		clothing.getTitle = () => clothing.platform
		return clothing
	},
})
