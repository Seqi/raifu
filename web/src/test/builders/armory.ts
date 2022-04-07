import faker from '@faker-js/faker'
import { perBuild, oneOf, build } from '@jackfranklin/test-data-bot'
import { platforms } from 'app/data/constants'
import { Attachment } from 'app/features/armory'

export const buildAttachment = build<Attachment>({
	fields: {
		id: perBuild(() => faker.datatype.string(14)),
		createdAt: perBuild(() => faker.date.recent().toISOString()),
		updatedAt: perBuild(() => faker.date.recent().toISOString()),
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
