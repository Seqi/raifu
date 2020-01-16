import React, { useContext } from 'react'

import { LoadoutContext } from 'app/features/loadouts'
import AddResourceDialog from 'app/shared/dialogs/AddResourceDialog'
import LoadoutResourceList from '../LoadoutResourceList/LoadoutResourceList'
import AvailableArmoryContext from '../AvailableArmoryContext'

let LoadoutGearList = () => {
	let { loadout, addGear, deleteGear } = useContext(LoadoutContext)
	let { gear } = useContext(AvailableArmoryContext)

	return (
		<LoadoutResourceList
			resourceType='gear'
			items={ loadout.gear || [] }
			addItem={ addGear }
			deleteItem={ deleteGear }
			renderAddDialog={ (isOpen, onClose, onSave) => (
				<AddResourceDialog 
					title='Add gear to loadout'
					items={ gear || [] }
					category='gear'
					allowMultiple={ true }
					isOpen={ isOpen } 
					onSave={ onSave }
					onClose={ onClose } 
				/>
			) }
		/>
	)
}

export default LoadoutGearList