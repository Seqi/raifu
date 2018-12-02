import client from '.'
import config from '../config'
import auth from './auth'

let database = client.database(config.firebase.databaseURL)

function useCrud(route, userRoute) {
	return {
		get: () => database.ref(`${route}/${auth.user.uid}/${userRoute}`)
			.once('value'),
		getById: (id) => database.ref(`${route}/${auth.user.uid}/${userRoute}/${id}`)
			.once('value'),
		add: (props) => database.ref(`${route}/${auth.user.uid}/${userRoute}`)
			.push(props)
	}
}

let primaries = useCrud('armory', 'primaries')
let secondaries = useCrud('armory', 'secondaries')
let attachments = useCrud('armory', 'attachments')
let gear = useCrud('armory', 'gear')

let loadouts = {
	...useCrud('loadouts', ''),
	getById: (id) => {
		// Override get to load all the components of the loadout too
		let populateChildren = (promises, slot, snap) => {
			let val = snap.val()

			return Promise.all(promises)
				.then((result) => {
					let populatedWeapons = {}

					result.forEach((result) => {
						populatedWeapons[result.key] = result.val()
					})

					return populatedWeapons
				})
				.then((populatedWeapons) => {
					// Lil hacky to rearrange the firebase object with the new vals
					val[slot] = populatedWeapons
					snap.val = () => val

					return snap
				})
		}
		return (
			database
				.ref(`loadouts/${auth.user.uid}/${id}`)
				.once('value')

				// Load primaries
				.then((snap) => {
					let val = snap.val()

					let promises = Object.keys(val.primaries)
						.map((key) => primaries.getById(key))

					return populateChildren(promises, 'primaries', snap)
				})

				// Load secondaries
				.then((snap) => {
					let val = snap.val()

					let promises = Object.keys(val.secondaries)
						.map((key) => secondaries.getById(key))

					return populateChildren(promises, 'secondaries', snap)
				})
		)
	},
	addPrimary: (loadoutId, primaryId) => {
		database.ref(`loadouts/${auth.user.uid}/${loadoutId}/primaries`)
			.update({ [primaryId]: true })
	},
	addSecondary: (loadoutId, primaryId) => {
		database.ref(`loadouts/${auth.user.uid}/${loadoutId}/secondaries`)
			.update({ [primaryId]: true })
	}
}

export default {
	primaries: primaries,
	secondaries: secondaries,
	attachments: attachments,
	gear: gear,
	loadouts: loadouts,
	brands: {
		get: () => database.ref('brands')
			.once('value')
	},
	platforms: {
		getTypes: () => database.ref('platforms')
			.once('value'),
		get: (platform) => database.ref(`platforms/${platform}`)
			.once('value')
	}
}
