import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import useAnalytics from 'app/shared/hooks/useAnalytics'
import { loadouts } from 'app/data/api'

let LoadoutContext = React.createContext()

const LoadoutContextProvider = ({ loadout, editable, children }) => {
	let [currentLoadout, setLoadout] = useState(loadout)
	let analytics = useAnalytics()

	useEffect(() => setLoadout(loadout), [loadout])

	let addWeapon = useCallback(
		async (weaponId) => {
			// Save
			const weapon = await loadouts.loadout(currentLoadout.id).weapons.add(weaponId)

			analytics.logEvent('loadout_weapon_added')

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				weapons: [...currentLoadout.weapons, weapon]
			}))
		},
		[analytics, currentLoadout.id]
	)

	let deleteWeapon = useCallback(
		async (weaponId) => {
			// Save
			await loadouts.loadout(currentLoadout.id).weapons.delete(weaponId)

			analytics.logEvent('loadout_weapon_deleted')

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				weapons: currentLoadout.weapons.filter((w) => w.id !== weaponId)
			}))
		},
		[analytics, currentLoadout.id]
	)

	let addWeaponAttachments = useCallback(
		async (weaponId, attachmentIds) => {
			// Save
			let addToDbPromises = attachmentIds.map((attachmentId) => {
				return loadouts
					.loadout(currentLoadout.id)
					.weapons.weapon(weaponId)
					.attachments.add(attachmentId)
			})

			let newAttachments = await Promise.all(addToDbPromises)

			attachmentIds.forEach(_ => analytics.logEvent('loadout_attachment_added'))

			// Update
			setLoadout((currentLoadout) => {
				let weaponIndex = currentLoadout.weapons.findIndex((w) => w.id === weaponId)

				// Find the weapon to add the attachment to and create a copy
				let weaponToAddTo = { ...currentLoadout.weapons[weaponIndex] }

				// Add the attachment to the weapon
				weaponToAddTo.attachments = [...(weaponToAddTo.attachments || []), ...newAttachments]

				// Rebuild up the state object, ensuring we preserve the order of weapons
				let newWeapons = currentLoadout.weapons.slice()
				newWeapons[weaponIndex] = weaponToAddTo

				return { ...currentLoadout, weapons: newWeapons }
			})
		},
		[analytics, currentLoadout.id]
	)

	let deleteWeaponAttachment = useCallback(
		async (weaponId, attachmentId) => {
			// Save
			await loadouts
				.loadout(currentLoadout.id)
				.weapons.weapon(weaponId)
				.attachments.delete(attachmentId)

			analytics.logEvent('loadout_attachment_deleted')

			// Update
			setLoadout((currentLoadout) => {
				let weaponIndex = currentLoadout.weapons.findIndex((w) => w.id === weaponId)

				// Find the weapon to delete the attachment on and create a copy
				let weaponToAddTo = { ...currentLoadout.weapons[weaponIndex] }

				// Remove attachment
				weaponToAddTo.attachments = weaponToAddTo.attachments.filter((a) => a.id !== attachmentId)

				// Rebuild up the state object, ensuring we preserve the order of weapons
				let newWeapons = currentLoadout.weapons.slice()
				newWeapons[weaponIndex] = weaponToAddTo

				return { ...currentLoadout, weapons: newWeapons }
			})
		},
		[analytics, currentLoadout.id]
	)

	let addGear = useCallback(
		async (ids) => {
			// Save
			let promises = ids.map((gearId) => {
				return loadouts.loadout(currentLoadout.id).gear.add(gearId)
			})

			let newGear = await Promise.all(promises)

			ids.forEach(_ => analytics.logEvent('loadout_gear_added'))

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				gear: [...currentLoadout.gear, ...newGear]
			}))
		},
		[analytics, currentLoadout.id]
	)

	let deleteGear = useCallback(
		async (gearId) => {
			// Save
			await loadouts.loadout(currentLoadout.id).gear.delete(gearId)

			analytics.logEvent('loadout_gear_deleted')

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				gear: currentLoadout.gear.filter((g) => g.id !== gearId)
			}))
		},
		[analytics, currentLoadout.id]
	)

	let addClothing = useCallback(
		async (ids) => {
			// Save
			let promises = ids.map((clothingId) => {
				return loadouts.loadout(currentLoadout.id).clothing.add(clothingId)
			})

			let newClothing = await Promise.all(promises)

			ids.forEach(_ => analytics.logEvent('loadout_clothing_added'))

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				clothing: [...currentLoadout.clothing, ...newClothing]
			}))
		},
		[analytics, currentLoadout.id]
	)

	let deleteClothing = useCallback(
		async (clothingId) => {
			// Save
			await loadouts.loadout(currentLoadout.id).clothing.delete(clothingId)

			analytics.logEvent('loadout_clothing_deleted')

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				clothing: currentLoadout.clothing.filter((c) => c.id !== clothingId)
			}))
		},
		[analytics, currentLoadout.id]
	)

	return (
		<LoadoutContext.Provider value={ {
			loadout: currentLoadout,
			editable,
			addWeapon,
			deleteWeapon,
			addWeaponAttachments,
			deleteWeaponAttachment,
			addGear,
			deleteGear,
			addClothing,
			deleteClothing
		} }>
			{children}
		</LoadoutContext.Provider>
	)
}

LoadoutContextProvider.propTypes = {
	loadout: PropTypes.object.isRequired,
	editable: PropTypes.bool
}

LoadoutContextProvider.defaultProps = {
	editable: false
}

export default LoadoutContext
export { LoadoutContextProvider, LoadoutContext }
