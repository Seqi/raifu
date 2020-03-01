import React, { useContext } from 'react'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'

import { LoadoutContext } from 'app/features/loadouts'
import LoadoutResourceList from '../LoadoutResourceList/LoadoutResourceList'
import AddResourceDialog from '../dialogs/AddResourceDialog'
import AvailableArmoryContext from '../AvailableArmoryContext'

let LoadoutGearList = () => {
	let { loadout, addGear, deleteGear } = useContext(LoadoutContext)
	let { gear: availableGear } = useContext(AvailableArmoryContext)

	return (
		<React.Fragment>			
			<ReactiveTitle variant='h4' mobileVariant='h5'>Gear</ReactiveTitle>
			
			<LoadoutResourceList
				resourceType='gear'
				items={ loadout.gear || [] }
				canAdd={ (availableGear || []).length > 0 }
				addItem={ addGear }
				deleteItem={ deleteGear }
				renderAddDialog={ (isOpen, onClose, onSave) => (
					<AddResourceDialog 
						title='Add gear to loadout'
						items={ availableGear || [] }
						category='gear'
						allowMultiple={ true }
						isOpen={ isOpen } 
						onSave={ onSave }
						onClose={ onClose } 
					/>
				) }
			/>
		</React.Fragment>
	)
}

export default LoadoutGearList