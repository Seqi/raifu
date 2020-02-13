import React, { useContext } from 'react'

import AddResourceDialog from 'app/shared/dialogs/AddResourceDialog'
import ReactiveTitle from 'app/shared/text/ReactiveTitle'

import { LoadoutContext } from 'app/features/loadouts'
import LoadoutResourceList from '../LoadoutResourceList/LoadoutResourceList'
import AvailableArmoryContext from '../AvailableArmoryContext'

let LoadoutClothingList = () => {
	let { loadout, addClothing, deleteClothing } = useContext(LoadoutContext)
	let { clothing: availableClothing } = useContext(AvailableArmoryContext)

	return (
		<React.Fragment>
			<ReactiveTitle variant='h4' mobileVariant='h5'>Clothing</ReactiveTitle>

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
		</React.Fragment>
	)
}

export default LoadoutClothingList