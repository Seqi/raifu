import React, { useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'

import AddButton from 'app/shared/components/Buttons/AddButton'

import LoadoutGear from './Gear/LoadoutGear'
import AddArmoryItemDialog from '../AddArmoryItemDialog/AddArmoryItemDialog'

import database from '../../../../../../firebase/database'

import './LoadoutGearList.css'
import LoadoutContext from 'app/features/Loadouts/Loadout/LoadoutContext'

let LoadoutGearList = ({ canEdit }) => {
	let [dialog, setDialog] = useState(null)
	let { loadout, addGear, deleteGear } = useContext(LoadoutContext)

	let addNewGear = useCallback((gearIds) => {
		let promises = gearIds.map(gearId => {
			return database.loadouts
				.loadout(loadout.id)
				.gear
				.add(gearId)
		})

		return Promise.all(promises)
			.then((gear) => addGear(gear))
			.then(() => setDialog(null))
	}, [addGear, loadout])
	
	let deleteNewGear = useCallback(async (gearId) => {
		await database.loadouts
			.loadout(loadout.id)
			.gear
			.delete(gearId)
			
		return deleteGear(gearId)
	}, [deleteGear, loadout])

	return (
		<React.Fragment>
			<div className='loadout-gear-list-container'>				
				{ 
					(loadout.gear || []).map(gear => (
						<div key={ gear.id } className='loadout-gear-list-item'>
							<LoadoutGear gear={ gear } canDelete={ canEdit } onDelete={ deleteNewGear }	/>
						</div>
					)) 
				}

				{ canEdit && 
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
				onSave={ addNewGear }
				onClose={ () => setDialog(null) } 
			/>
		</React.Fragment>
	)
}

LoadoutGearList.propTypes = {
	canEdit: PropTypes.bool
}

LoadoutGearList.defaultProps = {
	canEdit: false,
}

export default LoadoutGearList