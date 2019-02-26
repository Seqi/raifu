import auth from '../auth'

// Encapsulate in a function as uid is not populated until we
// actually want this data
export default () => {
	const user = `users/${auth.user.uid}`

	const armory = `${user}/armory`
	const weapons = `${armory}/weapons`
	const attachments = `${armory}/attachments`
	const gear = `${armory}/gear`

	const loadouts = `${user}/loadouts`
	const loadoutWeapons = (loadoutId) => `${loadouts}/${loadoutId}/weapons`
	const loadoutWeaponAttachments = (loadoutId, weaponId) =>
		`${loadoutWeapons(loadoutId)}/weapons/${weaponId}/attachments`

	const lookups = `${user}/lookups`
	const loadoutLookups = `${lookups}/loadouts`
	const loadoutWeaponLookups = `${loadoutLookups}/weapons`
	const loadoutAttachmentLookups = `${loadoutLookups}/weapons`

	return {
		user,
		armory: {
			weapons,
			attachments,
			gear
		},
		loadouts: loadouts,
		loadout: (loadoutId) => ({
			weapons: loadoutWeapons(loadoutId),
			weapon: (weaponId) => ({
				attachments: loadoutWeaponAttachments(loadoutId, weaponId)
			})
		}),
		lookups: {
			loadouts: {
				weapons: loadoutWeaponLookups,
				attachments: loadoutAttachmentLookups
			}
		}
	}
}
