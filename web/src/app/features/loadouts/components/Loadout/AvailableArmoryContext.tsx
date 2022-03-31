import React, { useEffect, useState, useContext, FC } from 'react'

import { armory as armoryService } from 'app/data/api'
import { Resource } from 'app/features/resource'
import { ArmoryCollection } from 'app/features/armory'

import { Loadout } from '../../models'
import { LoadoutContext } from './LoadoutContext'

// TODO: Type
export const AvailableArmoryContext = React.createContext<any>(null)

const emptyArmory: ArmoryCollection = {
	weapons: [],
	attachments: [],
	gear: [],
	clothing: [],
}

const getUnusedArmoryItems = (
	loadout: Loadout,
	armory: ArmoryCollection
): ArmoryCollection => {
	const usedWeapons = loadout.weapons
	const usedAttachments = loadout.weapons.flatMap((weapon) => weapon.attachments || [])
	const usedGear = loadout.gear
	const usedClothing = loadout.clothing

	const getUnusedResource = <R extends Resource>(
		resources: R[],
		usedResources: R[]
	): R[] => {
		return resources.filter(
			(resource) => !usedResources.find((usedResource) => usedResource.id === resource.id)
		)
	}

	return {
		weapons: getUnusedResource(armory.weapons, usedWeapons),
		attachments: getUnusedResource(armory.attachments, usedAttachments),
		gear: getUnusedResource(armory.gear, usedGear),
		clothing: getUnusedResource(armory.clothing, usedClothing),
	}
}

export const AvailableArmoryContextProvider: FC = ({ children }) => {
	const { loadout, editable } = useContext(LoadoutContext)
	const [armory, setArmory] = useState<ArmoryCollection>(emptyArmory)

	useEffect(() => {
		if (editable) {
			armoryService.get().then((userArmory: ArmoryCollection) => setArmory(userArmory))
		}
	}, [editable])

	const unusedArmoryItems = getUnusedArmoryItems(loadout, armory)

	return (
		<AvailableArmoryContext.Provider value={unusedArmoryItems}>
			{children}
		</AvailableArmoryContext.Provider>
	)
}
