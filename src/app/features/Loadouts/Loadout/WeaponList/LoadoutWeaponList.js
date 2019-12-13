import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import LoadoutAdd from '../LoadoutAdd'
import LoadoutSeparator from '../LoadoutSeparator'
import LoadoutWeapon from './Weapon/LoadoutWeapon'
import AddArmoryItemDialog from '../AddArmoryItemDialog/AddArmoryItemDialog'
import LoadoutContext from 'app/features/Loadouts/Loadout/LoadoutContext'

import database from '../../../../../firebase/database'

let LoadoutWeaponList = ({ canEdit }) => {
	let [dialog, setDialog] = useState(null)
	let { loadout, addWeapon } = useContext(LoadoutContext)

	let addNewWeapon = useCallback(async (weaponId) => {
		const weapon = await database.loadouts
			.loadout(loadout.id)
			.weapons
			.add(weaponId)

		setDialog(null)
		return addWeapon(weapon)
	}, [addWeapon, loadout])

	return (
		<React.Fragment>       
			{
				(loadout.weapons || []).map((weapon) => (			
					<LoadoutSeparator key={ weapon.id }>				
						<LoadoutWeapon weapon={ weapon } canEdit={ canEdit } />
					</LoadoutSeparator>
				))
			}

			{ canEdit && 
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
							onSave={ addNewWeapon }
							onClose={ () => setDialog(null) }
						/>
					</React.Fragment>
			}
		</React.Fragment>
	)
}

LoadoutWeaponList.propTypes = {
	canEdit: PropTypes.bool
}

LoadoutWeaponList.defaultProps = {
	canEdit: false
}

export default LoadoutWeaponList