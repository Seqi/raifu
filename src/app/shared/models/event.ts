import { Resource } from './resource'

export interface Event extends Resource {
	name: string
	date: Date
	location: string
	organiser_uid: string
	public: boolean
	owner: string
	isGroup: boolean

	loadout?: any
	users: any[]
}

export default Event
