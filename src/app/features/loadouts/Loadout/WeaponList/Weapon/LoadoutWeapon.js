import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import { LoadoutContext } from 'app/features/loadouts'
import ConfirmDeleteDialog from 'app/shared/components/dialogs/ConfirmDeleteDialog'
import ArmoryItemImage from 'app/shared/components/images/ArmoryItemImage'
import DeleteButton from 'app/shared/components/buttons/DeleteButton'
import ReactiveTitle from 'app/shared/components/Text/ReactiveTitle'
import LoadoutWeaponAttachmentList from './AttachmentList/LoadoutWeaponAttachmentList'
import './LoadoutWeapon.css'

let LoadoutWeapon = ({ weapon }) => {
	let [dialog, setDialog] = useState(null)
	let { editable, deleteWeapon } = useContext(LoadoutContext)	

	let deleteNewWeapon = useCallback(() => deleteWeapon(weapon.id), [deleteWeapon, weapon])

	return (
		<React.Fragment>	
			<div className='loadout-weapon-item-container'>
				<div className='loadout-weapon-item'>
					<ReactiveTitle variant='h4' mobileVariant='h5' style={ { zIndex: 1 } }>
						{ weapon.getTitle() }
							
						{ editable && <DeleteButton style={ {position: 'initial'} } onClick={ () => setDialog('delete') } /> }
					</ReactiveTitle>

					<ArmoryItemImage 
						style={ { width: '100%', height: '100%'	} }
						entity={ weapon }
						category={ 'weapons' }
					/>
				</div>	

				<LoadoutWeaponAttachmentList weapon={ weapon } />
			</div>	
				
			{ editable && <ConfirmDeleteDialog
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
	}).isRequired
}

export default LoadoutWeapon
