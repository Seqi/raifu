import PropTypes from 'prop-types'
import { Loadout, LoadoutPropType } from 'app/features/loadouts'
import { Resource, ResourcePropShape } from '../../resource/models/resource'

export interface Event extends Resource {
	name: string
	date: Date
	location: string
	organiserUid: string
	public: boolean
	owner?: boolean | null
	isGroup?: boolean | null

	loadout?: Loadout | null // TODO: ?
	users?: EventUser[] | null
}

export interface EventUser {
	uid?: string | null
	displayName?: string | null
	loadout?: Loadout | null
}

export const EventUserPropShape = {
	uid: PropTypes.string,
	displayName: PropTypes.string,
	loadout: PropTypes.shape(LoadoutPropType),
}

export const EventPropShape = {
	...ResourcePropShape,

	createdAt: PropTypes.instanceOf(Date).isRequired,
	updatedAt: PropTypes.instanceOf(Date).isRequired,
	name: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(Date).isRequired,
	location: PropTypes.string.isRequired,
	organiserUid: PropTypes.string.isRequired,
	public: PropTypes.bool.isRequired,
	owner: PropTypes.bool,
	isGroup: PropTypes.bool,

	loadout: PropTypes.shape(LoadoutPropType),
	users: PropTypes.arrayOf(PropTypes.shape(EventUserPropShape).isRequired),
}

export default Event
