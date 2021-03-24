import React, { useState, useContext, useCallback, FC } from 'react'

import { LoadoutContext, LoadoutAdd, LoadoutSeparator } from 'app/features/loadouts'
import LoadoutWeapon from './Weapon/LoadoutWeapon'
import AddResourceDialog from '../dialogs/AddResourceDialog'
import AvailableArmoryContext from '../AvailableArmoryContext'
import { LoadoutWeapon as LoadoutWeaponType } from 'app/shared/models/loadout'

const LoadoutWeaponList: FC = () => {
	let [dialog, setDialog] = useState<'add' | null>(null)
	let { loadout, editable, addWeapon } = useContext(LoadoutContext)
	let { weapons: availableWeapons } = useContext(AvailableArmoryContext)

	let saveWeapon = useCallback(
		async (weaponIds: string | string[]) => {
			if (!Array.isArray(weaponIds)) {
				weaponIds = [weaponIds]
			}

			await Promise.all(weaponIds.map((weaponId) => addWeapon(weaponId)))
			setDialog(null)
		},
		[addWeapon]
	)

	return (
		<React.Fragment>
			{(loadout.weapons || []).map((weapon: LoadoutWeaponType) => (
				<LoadoutSeparator key={ weapon.id }>
					<LoadoutWeapon weapon={ weapon } />
				</LoadoutSeparator>
			))}

			{editable && (availableWeapons || []).length > 0 && (
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
			)}
		</React.Fragment>
	)
}

export default LoadoutWeaponList
