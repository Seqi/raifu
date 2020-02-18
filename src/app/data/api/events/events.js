import base from '../base-entity'
import { toEntity } from '../models/entity.model'
import CloudFunction from '../cloud-function'

export default {
	...base('events'),
	setLoadout: (eventId, loadoutId) => 
		new CloudFunction()
			.path(`events/${eventId}/loadout/${loadoutId}`)
			.post()
			.then(toEntity),

	removeLoadout: (eventId) => 
		new CloudFunction()
			.path(`events/${eventId}/loadout/remove`)
			.post()
			.then(toEntity),

	join: (eventId) => 
		new CloudFunction()
			.path(`events/${eventId}/join`)
			.post()		
}