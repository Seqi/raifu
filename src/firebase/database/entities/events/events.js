import base from '../base-entity'
import { toEntity } from '../entity.model'
import { CloudFunction } from '../../../functions'

export default () => {
	return {
		...base('events'),
		setLoadout: (eventId, loadoutId) => 
			new CloudFunction()
				.path(`events/${eventId}/loadout/${loadoutId}`)
				.post()
				.then(toEntity),
	}
}