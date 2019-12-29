import React, { useContext } from 'react'

import { LoadoutContext } from 'app/features/loadouts'
import AddResourceDialog from 'app/shared/dialogs/AddResourceDialog'
import LoadoutResourceList from '../LoadoutResourceList/LoadoutResourceList'
import database from '../../../../../firebase/database'

let LoadoutClothingList = () => {
	let { loadout, addClothing, deleteClothing } = useContext(LoadoutContext)

	return (
		<LoadoutResourceList
			resourceType='clothing'
			items={ loadout.clothing || [] }
			addItem={ addClothing }
			deleteItem={ deleteClothing }
			renderAddDialog={ (isOpen, onClose, onSave) => (
				<AddResourceDialog 
					title='Add clothing to loadout'
					category='clothing'
					itemLoadFunc={ database.clothing.get }
					filterIds={ (loadout.clothing || []).map(g => g.id) }
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