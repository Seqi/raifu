import React, { useEffect, useState, FC } from 'react'

import { armory as armoryService } from 'app/data/api'
import { Resource } from 'app/features/resource'
import { ArmoryCollection } from 'app/features/armory'

import { Loadout } from '../../models'
import { useLoadout } from './LoadoutContext'

// TODO: Type
const AvailableArmoryContext = React.createContext<any>(null)

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
	if (!armory) {
		return emptyArmory
	}

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

const AvailableArmoryContextProvider: FC = ({ children }) => {
	let { loadout, editable } = useLoadout()
	let [armory, setArmory] = useState<ArmoryCollection>(emptyArmory)

	useEffect(() => {
		if (editable) {
			armoryService.get().then((userArmory: ArmoryCollection) => setArmory(userArmory))
		}
	}, [editable])

	let unusedArmoryItems = getUnusedArmoryItems(loadout, armory)

	return (
		<AvailableArmoryContext.Provider value={unusedArmoryItems}>
			{children}
		</AvailableArmoryContext.Provider>
	)
}

export default AvailableArmoryContext
export { AvailableArmoryContext, AvailableArmoryContextProvider }
