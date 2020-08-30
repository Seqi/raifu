import React, { useEffect, useState, useContext } from 'react'

import LoadoutContext from './LoadoutContext'
import { armory as armoryService } from 'app/data/api'

let AvailableArmoryContext = React.createContext()

let getUnusedArmoryItems = (loadout, armory) => {
	if (!armory) {
		return {}
	}

	// Flatten the attachments on the loadout to match the armory format
	let loadoutCopy = { ...loadout }
	loadoutCopy.attachments = loadoutCopy.weapons.flatMap((weapon) => weapon.attachments || [])

	return Object.keys(armory).reduce((obj, key) => {
		obj[key] = armory[key].filter(
			(armoryItem) => loadoutCopy[key].findIndex((loadoutItem) => loadoutItem.id === armoryItem.id) < 0
		)

		return obj
	}, {})
}

let AvailableArmoryContextProvider = ({ children }) => {
	let { loadout, editable } = useContext(LoadoutContext)
	let [armory, setArmory] = useState()

	useEffect(() => {
		if (editable && !armory) {
			armoryService.get().then((userArmory) => setArmory(userArmory))
		}
	}, [armory, editable])

	let unusedArmoryItems = getUnusedArmoryItems(loadout, armory)

	return <AvailableArmoryContext.Provider value={unusedArmoryItems}>{children}</AvailableArmoryContext.Provider>
}

export default AvailableArmoryContext
export { AvailableArmoryContext, AvailableArmoryContextProvider }
