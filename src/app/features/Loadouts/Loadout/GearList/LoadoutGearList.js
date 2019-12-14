import React, { useState, useCallback, useContext } from 'react'

import AddButton from 'app/shared/components/Buttons/AddButton'

import { LoadoutContext } from 'app/features/Loadouts'
import AddArmoryItemDialog from '../AddArmoryItemDialog/AddArmoryItemDialog'
import LoadoutGear from './Gear/LoadoutGear'
import database from '../../../../../firebase/database'
import './LoadoutGearList.css'

let LoadoutGearList = () => {
	let [dialog, setDialog] = useState(null)
	let { loadout, editable, addGear, deleteGear } = useContext(LoadoutContext)

	let saveGear = useCallback(async (gearIds) => {
		await addGear(gearIds)
		setDialog(null)
	}, [addGear])

	return (
		<React.Fragment>
			<div className='loadout-gear-list-container'>				
				{ 
					(loadout.gear || []).map(gear => (
						<div key={ gear.id } className='loadout-gear-list-item'>
							<LoadoutGear gear={ gear } canDelete={ editable } onDelete={ deleteGear } />
						</div>
					)) 
				}

				{ editable && 
					<div className='loadout-gear-list-item'>
						<AddButton onClick={ () => setDialog('add') } />
					</div>
				}
			</div>

			<AddArmoryItemDialog 
				title='Add gear to loadout'
				category='gear'
				itemLoadFunc={ database.gear.get }
				filterIds={ (loadout.gear || []).map(g => g.id) }
				isOpen={ dialog === 'add' } 
				allowMultiple={ true }
				onSave={ saveGear }
				onClose={ () => setDialog(null) } 
			/>
		</React.Fragment>
	)
}

export default LoadoutGearList