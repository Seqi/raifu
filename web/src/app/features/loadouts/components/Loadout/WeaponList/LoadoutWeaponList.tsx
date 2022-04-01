import React, { useState, useContext, useCallback, FC } from 'react'

import { LoadoutContext } from '../LoadoutContext'
import LoadoutAdd from '../LoadoutAdd'
import AddArmoryItemDialog from '../dialogs/AddArmoryItemDialog'
import { AvailableArmoryContext } from '../AvailableArmoryContext'
import { LoadoutWeapon } from '../../../models'
import LoadoutWeaponView from './Weapon/LoadoutWeaponView'

const LoadoutWeaponList: FC = () => {
	const [dialog, setDialog] = useState<'add' | null>(null)
	const { loadout, editable, addWeapon } = useContext(LoadoutContext)
	const { weapons: availableWeapons } = useContext(AvailableArmoryContext)

	const saveWeapon = useCallback(
		async (weaponIds: string | string[]) => {
			if (!Array.isArray(weaponIds)) {
				// eslint-disable-next-line no-param-reassign
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
