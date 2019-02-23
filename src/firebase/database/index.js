import client from '..'
import config from 'config'

import weapons from './entities/armory/weapons'
import attachments from './entities/armory/attachments'
import gear from './entities/armory/gear'
import loadouts from './entities/loadouts/loadouts'

let database = client.database(config.firebase.databaseURL)

export { database }

export default {
	weapons: weapons(),
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
