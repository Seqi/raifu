import React, { useState, useContext, useCallback } from 'react'

import { LoadoutContext, LoadoutAdd, LoadoutSeparator } from 'app/features/loadouts'
import LoadoutWeapon from './Weapon/LoadoutWeapon'
import AddResourceDialog from '../dialogs/AddResourceDialog'
import AvailableArmoryContext from '../AvailableArmoryContext'

let LoadoutWeaponList = () => {
	let [dialog, setDialog] = useState(null)
	let { loadout, editable, addWeapon } = useContext(LoadoutContext)
	let { weapons: availableWeapons } = useContext(AvailableArmoryContext)

	let saveWeapon = useCallback(async (weaponId) => {
		await addWeapon(weaponId)
		setDialog(null)
	}, [addWeapon])

	return (
		<React.Fragment>       
			{
				(loadout.weapons || []).map((weapon) => (			
					<LoadoutSeparator key={ weapon.id }>				
						<LoadoutWeapon weapon={ weapon } />
					</LoadoutSeparator>
				))
			}

			{ editable && (availableWeapons || []).length > 0 &&
					<React.Fragment>
						<LoadoutSeparator>
							<LoadoutAdd onClick={ () => setDialog('add') } />
						</LoadoutSeparator>

						<AddResourceDialog
							title='Add weapon to loadout'
							items={ availableWeapons || [] }
							category='weapons'
							isOpen={ dialog === 'add' }
							onSave={ saveWeapon }
							onClose={ () => setDialog(null) }
						/>
					</React.Fragment>
			}
		</React.Fragment>
	)
}

export default LoadoutWeaponList