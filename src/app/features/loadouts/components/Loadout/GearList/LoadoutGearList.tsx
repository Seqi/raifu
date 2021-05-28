import React, { FC, useContext } from 'react'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'

import LoadoutContext from '../LoadoutContext'
import LoadoutResourceList from '../LoadoutResourceList/LoadoutResourceList'
import AddResourceDialog from '../dialogs/AddArmoryItemDialog'
import AvailableArmoryContext from '../AvailableArmoryContext'

const LoadoutGearList: FC = () => {
	let { loadout, addGear, deleteGear } = useContext(LoadoutContext)
	let { gear: availableGear } = useContext(AvailableArmoryContext)

	return (
		<React.Fragment>
			<ReactiveTitle variant='h4' mobileVariant='h5'>
				Gear
			</ReactiveTitle>

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

export default LoadoutGearList
