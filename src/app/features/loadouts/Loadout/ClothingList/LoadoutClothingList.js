import React, { useContext } from 'react'

import { LoadoutContext } from 'app/features/loadouts'
import AddResourceDialog from 'app/shared/dialogs/AddResourceDialog'
import LoadoutResourceList from '../LoadoutResourceList/LoadoutResourceList'
import AvailableArmoryContext from '../AvailableArmoryContext'

let LoadoutClothingList = () => {
	let { loadout, addClothing, deleteClothing } = useContext(LoadoutContext)
	let { clothing: availableClothing } = useContext(AvailableArmoryContext)

	return (
		<LoadoutResourceList
			resourceType='clothing'
			items={ loadout.clothing || [] }
			canAdd={ (availableClothing || []).length > 0 }
			addItem={ addClothing }
			deleteItem={ deleteClothing }
			renderAddDialog={ (isOpen, onClose, onSave) => (
				<AddResourceDialog 
					title='Add clothing to loadout'
					items={ availableClothing || [] }
					category='clothing'
					allowMultiple={ true }
					isOpen={ isOpen } 
					onSave={ onSave }
					onClose={ onClose } 
				/>
			) }
		/>
	)
}

export default LoadoutClothingList