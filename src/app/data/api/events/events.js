import base from '../base-entity'
import Event from '../../models/event.model'
import CloudFunction from '../cloud-function'

const events = {
	...base('events', Event),
	setLoadout: (eventId, loadoutId) =>
		new CloudFunction()
			.path(`events/${eventId}/loadout/${loadoutId}`)
			.post()
			.then((result) => new Event(result)),

	removeLoadout: (eventId) =>
		new CloudFunction()
			.path(`events/${eventId}/loadout/remove`)
			.post()
			.then((result) => new Event(result)),

	join: (eventId) => new CloudFunction()
		.path(`events/${eventId}/join`)
		.post(),

	leave: (id) => new CloudFunction()
		.path(`events/${id}/leave`)
		.post(),
}

export default events
