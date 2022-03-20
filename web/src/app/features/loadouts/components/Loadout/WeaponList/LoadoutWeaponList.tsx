import React, { useState, useContext, useCallback, FC } from 'react'

import { LoadoutContext } from '../LoadoutContext'
import LoadoutAdd from '../LoadoutAdd'
import AddArmoryItemDialog from '../dialogs/AddArmoryItemDialog'
import { AvailableArmoryContext } from '../AvailableArmoryContext'
import { LoadoutWeapon } from '../../../models'
import LoadoutWeaponView from './Weapon/LoadoutWeaponView'

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
		<>
			{(loadout.weapons || []).map((weapon: LoadoutWeapon) => (
				<LoadoutWeaponView key={weapon.id} weapon={weapon} />
			))}

			{editable && (availableWeapons || []).length > 0 && (
				<>
					<LoadoutAdd onClick={() => setDialog('add')} />

					<AddArmoryItemDialog
						title='Add weapon to loadout'
						items={availableWeapons || []}
						category='weapons'
						isOpen={dialog === 'add'}
						onSave={saveWeapon}
						onClose={() => setDialog(null)}
					/>
				</>
			)}
		</>
	)
}

export default LoadoutWeaponList
