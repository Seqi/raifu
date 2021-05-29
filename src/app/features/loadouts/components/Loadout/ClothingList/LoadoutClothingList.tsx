import React, { useContext } from 'react'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'

import LoadoutResourceList from '../LoadoutResourceList/LoadoutResourceList'
import AddArmoryItemDialog from '../dialogs/AddArmoryItemDialog'
import AvailableArmoryContext from '../AvailableArmoryContext'
import LoadoutContext from '../LoadoutContext'

let LoadoutClothingList = () => {
	let { loadout, addClothing, deleteClothing } = useContext(LoadoutContext)
	let { clothing: availableClothing } = useContext(AvailableArmoryContext)

	return (
		<React.Fragment>
			<ReactiveTitle variant='h4' mobileVariant='h5' align='center'>
				Clothing
			</ReactiveTitle>

			<LoadoutResourceList
				resourceType='clothing'
				items={ loadout.clothing || [] }
				canAdd={ (availableClothing || []).length > 0 }
				addItem={ addClothing }
				deleteItem={ deleteClothing }
				renderAddDialog={ (isOpen, onClose, onSave) => (
					<AddArmoryItemDialog
						title='Add clothing to loadout'
						items={ availableClothing || [] }
						category='clothing'
						allowMultiple={ true }
						isOpen={ isOpen }
						onSave={ onSave }
						onClose={ onClose }
					/>
				) }
				gridItemProps={ {
					xs: 4,
					sm: 3,
					md: 2,
					xl: 'auto',
				} }
			/>
		</React.Fragment>
	)
}

export default LoadoutClothingList
