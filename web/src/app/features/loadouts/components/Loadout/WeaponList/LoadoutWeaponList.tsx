import React, { useState, useContext, useCallback, FC } from 'react'

import LoadoutAdd from '../LoadoutAdd'
import LoadoutWeaponView from './Weapon/LoadoutWeaponView'
import AddArmoryItemDialog from '../dialogs/AddArmoryItemDialog'
import AvailableArmoryContext from '../AvailableArmoryContext'
import { LoadoutWeapon } from '../../../models'
import { useLoadout } from '../LoadoutContext'

const LoadoutWeaponList: FC = () => {
	let [dialog, setDialog] = useState<'add' | null>(null)
	let { loadout, editable, addWeapon } = useLoadout()
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
		<>
			{(loadout.weapons || []).map((weapon: LoadoutWeapon) => (
				<LoadoutWeaponView key={weapon.id} weapon={weapon} />
			))}

			{editable && (availableWeapons || []).length > 0 && (
				<React.Fragment>
					<LoadoutAdd onClick={() => setDialog('add')} />

					<AddArmoryItemDialog
						title='Add weapon to loadout'
						items={availableWeapons || []}
						category='weapons'
						isOpen={dialog === 'add'}
						onSave={saveWeapon}
						onClose={() => setDialog(null)}
					/>
				</React.Fragment>
			)}
		</>
	)
}

export default LoadoutWeaponList
