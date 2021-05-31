import { FC, useContext } from 'react'

import LoadoutContext from '../LoadoutContext'
import LoadoutResourceList from '../LoadoutResourceList/LoadoutResourceList'
import AddArmoryItemDialog from '../dialogs/AddArmoryItemDialog'
import AvailableArmoryContext from '../AvailableArmoryContext'
import { LoadoutWeaponTitle } from '../LoadoutItemTitle'

const LoadoutGearList: FC = () => {
	let { loadout, addGear, deleteGear } = useContext(LoadoutContext)
	let { gear: availableGear } = useContext(AvailableArmoryContext)

	return (
		<section>
			<LoadoutWeaponTitle variant='h4' align='center'>
				Gear
			</LoadoutWeaponTitle>

			<LoadoutResourceList
				resourceType='gear'
				items={ loadout.gear || [] }
				canAdd={ (availableGear || []).length > 0 }
				addItem={ addGear }
				deleteItem={ deleteGear }
				renderAddDialog={ (isOpen, onClose, onSave) => (
					<AddArmoryItemDialog
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
		</section>
	)
}

export default LoadoutGearList
