import React, { useContext } from 'react'

import LoadoutResourceList from '../LoadoutResourceList/LoadoutResourceList'
import AddArmoryItemDialog from '../dialogs/AddArmoryItemDialog'
import AvailableArmoryContext from '../AvailableArmoryContext'
import LoadoutContext from '../LoadoutContext'
import { LoadoutWeaponTitle } from '../LoadoutItemTitle'

let LoadoutClothingList = () => {
	let { loadout, addClothing, deleteClothing } = useContext(LoadoutContext)
	let { clothing: availableClothing } = useContext(AvailableArmoryContext)

	return (
		<section>
			<LoadoutWeaponTitle variant='h4' align='center'>
				Clothing
			</LoadoutWeaponTitle>

			<LoadoutResourceList
				resourceType='clothing'
				items={loadout.clothing || []}
				canAdd={(availableClothing || []).length > 0}
				addItem={addClothing}
				deleteItem={deleteClothing}
				renderAddDialog={(isOpen, onClose, onSave) => (
					<AddArmoryItemDialog
						title='Add clothing to loadout'
						items={availableClothing || []}
						category='clothing'
						allowMultiple={true}
						isOpen={isOpen}
						onSave={onSave}
						onClose={onClose}
					/>
				)}
				gridItemProps={{
					xs: 4,
					sm: 3,
					md: 2,
					xl: 'auto',
				}}
			/>
		</section>
	)
}

export default LoadoutClothingList
