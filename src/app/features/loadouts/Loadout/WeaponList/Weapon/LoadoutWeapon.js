import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import { LoadoutContext } from 'app/features/loadouts'
import ConfirmDeleteDialog from 'app/shared/dialogs/ConfirmDeleteDialog'
import ResourceImage from 'app/shared/images/ResourceImage'
import DeleteButton from 'app/shared/buttons/DeleteButton'
import ReactiveTitle from 'app/shared/text/ReactiveTitle'

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

					<ResourceImage 
						style={ { width: '100%', height: '100%'	} }
						resource={ weapon }
						resourceType='weapons'
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
