import React, { useState, useEffect, useCallback, FC, useContext } from 'react'
import PropTypes from 'prop-types'

import useAnalytics from 'app/shared/hooks/useAnalytics'
import { loadouts } from 'app/data/api'
import { Loadout, LoadoutPropType } from '../../models'
import { Clothing, Gear } from 'app/features/armory'

export type LoadoutContextValue = {
	loadout: Loadout
	editable?: boolean
	addWeapon: (weaponId: string) => Promise<void>
	deleteWeapon: (weaponId: string) => Promise<void>
	addWeaponAttachments: (weaponId: string, attachmentIds: string[]) => Promise<void>
	deleteWeaponAttachment: (weaponId: string, attachmentsId: string) => Promise<void>
	addGear: (gearIds: string[]) => Promise<void>
	deleteGear: (gear: Gear) => Promise<void>
	addClothing: (clothingIds: string[]) => Promise<void>
	deleteClothing: (clothing: Clothing) => Promise<void>
}

export const LoadoutContext = React.createContext<LoadoutContextValue | undefined>(
	undefined
)

export type LoadoutContextProviderProps = {
	loadout: Loadout
	editable?: boolean
}

export const LoadoutProvider: FC<LoadoutContextProviderProps> = ({
	loadout,
	editable,
	children,
}) => {
	let [currentLoadout, setLoadout] = useState<Loadout>(loadout)
	let analytics = useAnalytics()

	useEffect(() => setLoadout(loadout), [loadout])

	let addWeapon = useCallback(
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

	let deleteWeapon = useCallback(
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

	let addWeaponAttachments = useCallback(
		async (weaponId: string, attachmentIds: string[]) => {
			// Save
			let addToDbPromises = attachmentIds.map((attachmentId) => {
				return loadouts
					.loadout(currentLoadout.id)
					.weapons.weapon(weaponId)
					.attachments.add(attachmentId)
			})

			let newAttachments = await Promise.all(addToDbPromises)

			attachmentIds.forEach((_) => analytics.logEvent('loadout_attachment_added'))

			// Update
			setLoadout((currentLoadout) => {
				let weaponIndex = currentLoadout.weapons.findIndex((w) => w.id === weaponId)

				// Find the weapon to add the attachment to and create a copy
				let weaponToAddTo = { ...currentLoadout.weapons[weaponIndex] }

				// Add the attachment to the weapon
				weaponToAddTo.attachments = [
					...(weaponToAddTo.attachments || []),
					...newAttachments,
				]

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
				weaponToAddTo.attachments = weaponToAddTo.attachments.filter(
					(a) => a.id !== attachmentId
				)

				// Rebuild up the state object, ensuring we preserve the order of weapons
				let newWeapons = currentLoadout.weapons.slice()
				newWeapons[weaponIndex] = weaponToAddTo

				return { ...currentLoadout, weapons: newWeapons }
			})
		},
		[analytics, currentLoadout.id]
	)

	let addGear = useCallback(
		async (ids: string[]) => {
			// Save
			let promises = ids.map((gearId) => {
				return loadouts.loadout(currentLoadout.id).gear.add(gearId)
			})

			let newGear = await Promise.all(promises)

			ids.forEach((_) => analytics.logEvent('loadout_gear_added'))

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				gear: [...currentLoadout.gear, ...newGear],
			}))
		},
		[analytics, currentLoadout.id]
	)

	let deleteGear = useCallback(
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

	let addClothing = useCallback(
		async (ids: string[]) => {
			// Save
			let promises = ids.map((clothingId) => {
				return loadouts.loadout(currentLoadout.id).clothing.add(clothingId)
			})

			let newClothing = await Promise.all(promises)

			ids.forEach((_) => analytics.logEvent('loadout_clothing_added'))

			// Update
			setLoadout((currentLoadout) => ({
				...currentLoadout,
				clothing: [...currentLoadout.clothing, ...newClothing],
			}))
		},
		[analytics, currentLoadout.id]
	)

	let deleteClothing = useCallback(
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

LoadoutProvider.propTypes = {
	loadout: PropTypes.shape(LoadoutPropType).isRequired,
	editable: PropTypes.bool,
}

LoadoutProvider.defaultProps = {
	editable: false,
}

export const useLoadout = (): LoadoutContextValue => {
	const context = useContext(LoadoutContext)

	if (context === undefined) {
		throw new Error('useLoadout must be used within a LoadoutProvider')
	}

	return context
}
