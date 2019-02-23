import client from '..'
import config from 'config'

import primaries from './entities/armory/primaries'
import secondaries from './entities/armory/secondaries'
import attachments from './entities/armory/attachments'
import gear from './entities/armory/gear'
import loadouts from './entities/loadouts/loadouts'

let database = client.database(config.firebase.databaseURL)

export { database }

export default {
	primaries: primaries(),
	secondaries: secondaries(),
	attachments: attachments(),
	gear: gear(),
	loadouts: loadouts(),
	brands: {
		get: () => database.ref('brands')
			.once('value')
	},
	platforms: {
		getTypes: () => database.ref('platforms')
			.once('value'),
		get: (platform) => database.ref(`platforms/${platform}`)
			.once('value')
	},
	attachment: {
		getTypes: () => database.ref('attachments')
			.once('value')
	}
}
