import React, { useState, useEffect, useCallback, FC } from 'react'
import PropTypes from 'prop-types'

import useAnalytics from 'app/shared/hooks/useAnalytics'
import { loadouts } from 'app/data/api'
import { Clothing, Gear } from 'app/features/armory'

import { Loadout, LoadoutPropType } from '../../models'

// TODO: Type
export const LoadoutContext = React.createContext<any>(null)

type LoadoutContextProviderProps = {
	loadout: Loadout
	editable?: boolean
}

export const LoadoutContextProvider: FC<LoadoutContextProviderProps> = ({
	loadout,
	editable,
	children,
}) => {
	const [currentLoadout, setLoadout] = useState<Loadout>(loadout)
	const analytics = useAnalytics()

	useEffect(() => setLoadout(loadout), [loadout])

	const addWeapon = useCallback(
		async (weaponId: string) => {
			// Save
			const weapon = await loadouts.loadout(currentLoadout.id).weapons.add(weaponId)

			analytics.logEvent('loadout_weapon_added')

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				weapons: [...currentLoadout.weapons, weapon],
			}))
		},
		[analytics, currentLoadout.id]
	)

	const deleteWeapon = useCallback(
		async (weaponId: string) => {
			// Save
			await loadouts.loadout(currentLoadout.id).weapons.delete(weaponId)

			analytics.logEvent('loadout_weapon_deleted')

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				weapons: currentLoadout.weapons.filter((w) => w.id !== weaponId),
			}))
		},
		[analytics, currentLoadout.id]
	)

	const addWeaponAttachments = useCallback(
		async (weaponId: string, attachmentIds: string[]) => {
			// Save
			const addToDbPromises = attachmentIds.map((attachmentId) => {
				return loadouts
					.loadout(currentLoadout.id)
					.weapons.weapon(weaponId)
					.attachments.add(attachmentId)
			})

			const newAttachments = await Promise.all(addToDbPromises)

			attachmentIds.forEach((_) => analytics.logEvent('loadout_attachment_added'))

			// Update
			setLoadout((currentLoadout) => {
				const weaponIndex = currentLoadout.weapons.findIndex((w) => w.id === weaponId)

				// Find the weapon to add the attachment to and create a copy
				const weaponToAddTo = { ...currentLoadout.weapons[weaponIndex] }

				// Add the attachment to the weapon
				weaponToAddTo.attachments = [
					...(weaponToAddTo.attachments || []),
					...newAttachments,
				]

				// Rebuild up the state object, ensuring we preserve the order of weapons
				const newWeapons = currentLoadout.weapons.slice()
				newWeapons[weaponIndex] = weaponToAddTo

				return { ...currentLoadout, weapons: newWeapons }
			})
		},
		[analytics, currentLoadout.id]
	)

	const deleteWeaponAttachment = useCallback(
		async (weaponId, attachmentId) => {
			// Save
			await loadouts
				.loadout(currentLoadout.id)
				.weapons.weapon(weaponId)
				.attachments.delete(attachmentId)

			analytics.logEvent('loadout_attachment_deleted')

			// Update
			setLoadout((currentLoadout) => {
				const weaponIndex = currentLoadout.weapons.findIndex((w) => w.id === weaponId)

				// Find the weapon to delete the attachment on and create a copy
				const weaponToAddTo = { ...currentLoadout.weapons[weaponIndex] }

				// Remove attachment
				weaponToAddTo.attachments = weaponToAddTo.attachments.filter(
					(a) => a.id !== attachmentId
				)

				// Rebuild up the state object, ensuring we preserve the order of weapons
				const newWeapons = currentLoadout.weapons.slice()
				newWeapons[weaponIndex] = weaponToAddTo

				return { ...currentLoadout, weapons: newWeapons }
			})
		},
		[analytics, currentLoadout.id]
	)

	const addGear = useCallback(
		async (ids: string[]) => {
			// Save
			const promises = ids.map((gearId) => {
				return loadouts.loadout(currentLoadout.id).gear.add(gearId)
			})

			const newGear = await Promise.all(promises)

			ids.forEach((_) => analytics.logEvent('loadout_gear_added'))

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				gear: [...currentLoadout.gear, ...newGear],
			}))
		},
		[analytics, currentLoadout.id]
	)

	const deleteGear = useCallback(
		async (gear: Gear) => {
			// Save
			await loadouts.loadout(currentLoadout.id).gear.delete(gear.id)

			analytics.logEvent('loadout_gear_deleted')

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				gear: currentLoadout.gear.filter((g) => g.id !== gear.id),
			}))
		},
		[analytics, currentLoadout.id]
	)

	const addClothing = useCallback(
		async (ids: string[]) => {
			// Save
			const promises = ids.map((clothingId) => {
				return loadouts.loadout(currentLoadout.id).clothing.add(clothingId)
			})

			const newClothing = await Promise.all(promises)

			ids.forEach((_) => analytics.logEvent('loadout_clothing_added'))

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				clothing: [...currentLoadout.clothing, ...newClothing],
			}))
		},
		[analytics, currentLoadout.id]
	)

	const deleteClothing = useCallback(
		async (clothing: Clothing) => {
			// Save
			await loadouts.loadout(currentLoadout.id).clothing.delete(clothing.id)

			analytics.logEvent('loadout_clothing_deleted')

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				clothing: currentLoadout.clothing.filter((c) => c.id !== clothing.id),
			}))
		},
		[analytics, currentLoadout.id]
	)

	return (
		<LoadoutContext.Provider
			value={{
				loadout: currentLoadout,
				editable,
				addWeapon,
				deleteWeapon,
				addWeaponAttachments,
				deleteWeaponAttachment,
				addGear,
				deleteGear,
				addClothing,
				deleteClothing,
			}}
		>
			{children}
		</LoadoutContext.Provider>
	)
}

LoadoutContextProvider.propTypes = {
	loadout: PropTypes.shape(LoadoutPropType).isRequired,
	editable: PropTypes.bool,
}

LoadoutContextProvider.defaultProps = {
	editable: false,
}
