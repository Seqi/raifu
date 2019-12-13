import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import LoadoutWeaponAttachmentList from './AttachmentList/LoadoutWeaponAttachmentList'

import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import ArmoryItemImage from 'app/shared/components/Images/ArmoryItemImage'
import DeleteButton from 'app/shared/components/Buttons/DeleteButton'
import ReactiveTitle from 'app/shared/components/Text/ReactiveTitle'

import './LoadoutWeapon.css'
import LoadoutContext from 'app/features/Loadouts/Loadout/LoadoutContext'
import database from '../../../../../../firebase/database'

let LoadoutWeapon = ({ weapon, canEdit }) => {
	let [dialog, setDialog] = useState(null)
	let { loadout, deleteWeapon } = useContext(LoadoutContext)	

	let deleteNewWeapon = useCallback(async () => {
		await database.loadouts
			.loadout(loadout.id)
			.weapons
			.delete(weapon.id)

		setDialog(null)
		return deleteWeapon(weapon.id)
	}, [deleteWeapon, loadout, weapon])

	return (
		<React.Fragment>	
			<div className='loadout-weapon-item-container'>
				<div className='loadout-weapon-item'>
					<ReactiveTitle variant='h4' mobileVariant='h5' style={ { zIndex: 1 } }>
						{ weapon.getTitle() }
							
						{ canEdit && <DeleteButton style={ {position: 'initial'} } onClick={ () => setDialog('delete') } /> }
					</ReactiveTitle>

					<ArmoryItemImage 
						style={ { width: '100%', height: '100%'	} }
						entity={ weapon }
						category={ 'weapons' }
					/>
				</div>	

				<LoadoutWeaponAttachmentList weapon={ weapon } canEdit={ canEdit } />
			</div>	
				
			{ canEdit && <ConfirmDeleteDialog
				title={ weapon.getTitle() }
				isOpen={ dialog === 'delete' }
				onClose={ () => setDialog(null) }
				onConfirm={ deleteNewWeapon }
			/> }
		</React.Fragment>
	)
}

LoadoutWeapon.propTypes = {
	weapon: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired
	}).isRequired,
	canEdit: PropTypes.bool,
}

LoadoutWeapon.defaultProps = {
	canEdit: false
}

export default LoadoutWeapon
