import PropTypes from 'prop-types'
import { Loadout, LoadoutPropType } from './loadout'
import { Resource, ResourcePropShape } from './resource'

export interface Event extends Resource {
	name: string
	date: Date
	location: string
	organiser_uid: string
	public: boolean
	owner: string
	isGroup: boolean

	loadout?: Loadout | null // TODO: ?
	users: EventUser[]
}

export interface EventUser {
	uid: string
	displayName: string
	loadout?: Loadout | null
}

export const EventUserPropShape = {
	uid: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	loadout: PropTypes.shape(LoadoutPropType),
}

export const EventPropShape = {
	...ResourcePropShape,

	name: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(Date).isRequired,
	location: PropTypes.string.isRequired,
	organiser_uid: PropTypes.string.isRequired,
	public: PropTypes.bool.isRequired,
	owner: PropTypes.string.isRequired,
	isGroup: PropTypes.bool.isRequired,

	loadout: PropTypes.shape(LoadoutPropType),
	users: PropTypes.arrayOf(PropTypes.shape(EventUserPropShape).isRequired).isRequired,
}

export default Event
