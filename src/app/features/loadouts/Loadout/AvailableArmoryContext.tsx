import React, { useEffect, useState, useContext, FC } from 'react'

import LoadoutContext from './LoadoutContext'
import { armory as armoryService } from 'app/data/api'
import { Loadout } from 'app/shared/models/loadout'
import { Attachment, Clothing, Gear, Weapon } from 'app/shared/models/armory-item'
import { Resource } from 'app/shared/models/resource'

// TODO: Type
const AvailableArmoryContext = React.createContext<any>(null)

// TODO: Move somewhere appropriate
type Armory = {
	weapons: Weapon[]
	attachments: Attachment[]
	gear: Gear[]
	clothing: Clothing[]
}

const emptyArmory = {
	weapons: [],
	attachments: [],
	gear: [],
	clothing: [],
}

const getUnusedArmoryItems = (loadout: Loadout, armory: Armory): Armory => {
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
	let { loadout, editable } = useContext(LoadoutContext)
	let [armory, setArmory] = useState<Armory>(emptyArmory)

	useEffect(() => {
		if (editable && !armory) {
			armoryService.get()
				.then((userArmory: Armory) => setArmory(userArmory))
		}
	}, [armory, editable])

	let unusedArmoryItems = getUnusedArmoryItems(loadout, armory)

	return (
		<AvailableArmoryContext.Provider value={ unusedArmoryItems }>
			{children}
		</AvailableArmoryContext.Provider>
	)
}

export default AvailableArmoryContext
export { AvailableArmoryContext, AvailableArmoryContextProvider }
