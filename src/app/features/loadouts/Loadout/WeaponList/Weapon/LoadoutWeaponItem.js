import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import ResourceImage from 'app/shared/images/ResourceImage'
import DeleteButton from 'app/shared/buttons/DeleteButton'
import ConfirmDeleteDialog from 'app/shared/dialogs/ConfirmDeleteDialog'

import { LoadoutContext } from 'app/features/loadouts'

import './LoadoutWeaponItem.css'

let LoadoutWeaponItem = ({ weapon }) => {
	let [dialog, setDialog] = useState(null)
	let { editable, deleteWeapon } = useContext(LoadoutContext)	

	let deleteNewWeapon = useCallback(() => deleteWeapon(weapon.id), [deleteWeapon, weapon])

	return (
		<React.Fragment>
			<div className='loadout-weapon-item' >
				<ReactiveTitle variant='h4' mobileVariant='h5' style={ { zIndex: 1 } }>
					{ weapon.getTitle() }
							
					{ editable && <DeleteButton style={ {position: 'initial'} } onClick={ () => setDialog('delete') } /> }
				</ReactiveTitle>

				<div className='center-loadout-item'>
					<ResourceImage 
						style={ { width: '100%', height: '100%'	} }
						resource={ weapon }
						resourceType='weapons'
					/>
				</div>
			</div>			
				
			{ editable && <ConfirmDeleteDialog
				title={ weapon.getTitle() }
				isOpen={ dialog === 'delete' }
				onClose={ () => setDialog(null) }
				onConfirm={ deleteNewWeapon }
			/>
			}
		</React.Fragment>
	)
}

LoadoutWeaponItem.propTypes = {
	weapon: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired
	}).isRequired
}

export default LoadoutWeaponItem