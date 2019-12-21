import React, { useState, useContext, useCallback } from 'react'

import { LoadoutContext, LoadoutAdd, LoadoutSeparator } from 'app/features/loadouts'
import AddArmoryItemDialog from 'app/shared/components/dialogs/AddArmoryItemDialog'
import LoadoutWeapon from './Weapon/LoadoutWeapon'

import database from '../../../../../firebase/database'

let LoadoutWeaponList = () => {
	let [dialog, setDialog] = useState(null)
	let { loadout, editable, addWeapon } = useContext(LoadoutContext)

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

			{ editable && 
					<React.Fragment>
						<LoadoutSeparator>
							<LoadoutAdd onClick={ () => setDialog('add') } />
						</LoadoutSeparator>

						<AddArmoryItemDialog
							title='Add weapon to loadout'
							category='weapons'
							itemLoadFunc={ database.weapons.get }
							filterIds={ (loadout.weapons || []).map((w) => w.id) }
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