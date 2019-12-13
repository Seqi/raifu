import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import LoadoutContext from './LoadoutContext'

const LoadoutContextProvider = ({ loadout, editable, children }) => {
	let [currentLoadout, setLoadout] = useState(loadout)

	useEffect(() => setLoadout(loadout), [loadout])

	let addWeapon = useCallback((newWeapon) => setLoadout((currentLoadout) => 
		({ 
			...currentLoadout,
			weapons: [ ...currentLoadout.weapons, newWeapon ]
		})
	), [])

	let deleteWeapon = useCallback((weaponId) => setLoadout((currentLoadout) => 
		({ 
			...currentLoadout,
			weapons: currentLoadout.weapons.filter((w) => w.id !== weaponId)
		})
	), [])

	let addGear = useCallback((newGear) => setLoadout((currentLoadout) => 
		({ 
			...currentLoadout,
			gear: [ ...currentLoadout.gear, ...newGear ]
		})
	), [])

	let deleteGear = useCallback((gearId) => setLoadout((currentLoadout) => 
		({ 
			...currentLoadout,
			gear: currentLoadout.gear.filter((g) => g.id !== gearId)
		})
	), [])

	let addWeaponAttachments = useCallback((weaponId, newAttachments) => setLoadout((currentLoadout) => {
		let weaponIndex = currentLoadout.weapons.findIndex((w) => w.id === weaponId)

		// Find the weapon to add the attachment to and create a copy
		let weaponToAddTo = { ...currentLoadout.weapons[weaponIndex] }

		// Add the attachment to the weapon
		weaponToAddTo.attachments = [ ...(weaponToAddTo.attachments || []), ...newAttachments]

		// Rebuild up the state object, ensuring we preserve the order of weapons
		let newWeapons = currentLoadout.weapons.slice()
		newWeapons[weaponIndex] = weaponToAddTo

		return { ...currentLoadout, weapons: newWeapons }
	}), [])

	let deleteWeaponAttachment = useCallback((weaponId, attachmentId) => setLoadout((currentLoadout) => {
		let weaponIndex = currentLoadout.weapons.findIndex((w) => w.id === weaponId)

		// Find the weapon to delete the attachment on and create a copy
		let weaponToAddTo = { ...currentLoadout.weapons[weaponIndex] }

		// Remove attachment
		weaponToAddTo.attachments = weaponToAddTo.attachments.filter((a) => a.id !== attachmentId)

		// Rebuild up the state object, ensuring we preserve the order of weapons
		let newWeapons = currentLoadout.weapons.slice()
		newWeapons[weaponIndex] = weaponToAddTo

		return { ...currentLoadout, weapons: newWeapons }
	}), [])

	return (
		<LoadoutContext.Provider value={ {
			loadout: currentLoadout,
			editable,
			addWeapon,
			deleteWeapon,
			addGear,
			deleteGear,
			addWeaponAttachments,
			deleteWeaponAttachment
		} }>
			{ children }
		</LoadoutContext.Provider>
	)
}

LoadoutContextProvider.propTypes = {
	loadout: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		gear: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			getTitle: PropTypes.func.isRequired,
		})),
		weapons: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			getTitle: PropTypes.func.isRequired,
			attachments: PropTypes.arrayOf(PropTypes.shape({
				id: PropTypes.string.isRequired,
				getTitle: PropTypes.func.isRequired,
			}))
		}))
	}).isRequired,
	editable: PropTypes.bool,
}

LoadoutContextProvider.defaultProps = {
	editable: false
}

export default LoadoutContextProvider