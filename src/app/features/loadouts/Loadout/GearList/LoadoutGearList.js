import React, { useContext } from 'react'

import { LoadoutContext } from 'app/features/loadouts'
import AddResourceDialog from 'app/shared/dialogs/AddResourceDialog'
import LoadoutResourceList from '../LoadoutResourceList/LoadoutResourceList'
import database from '../../../../../firebase/database'

let LoadoutGearList = () => {
	let { loadout, addGear, deleteGear } = useContext(LoadoutContext)

	return (
		<LoadoutResourceList
			items={ loadout.gear || [] }
			addItem={ addGear }
			deleteItem={ deleteGear }
			renderAddDialog={ (isOpen, onClose, onSave) => (
				<AddResourceDialog 
					title='Add gear to loadout'
					category='gear'
					itemLoadFunc={ database.gear.get }
					filterIds={ (loadout.gear || []).map(g => g.id) }
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