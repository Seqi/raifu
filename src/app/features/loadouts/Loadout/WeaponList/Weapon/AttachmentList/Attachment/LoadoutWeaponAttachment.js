import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { LoadoutContext } from 'app/features/loadouts'
import ConfirmDeleteDialog from 'app/shared/dialogs/ConfirmDeleteDialog'
import LoadoutItem from 'app/shared/images/LoadoutItem'

let LoadoutWeaponAttachment = ({ weaponId, attachment }) => {	
	let [ isDialogOpen, setIsDialogOpen ] = useState(false)
	let { editable, deleteWeaponAttachment } = useContext(LoadoutContext)

	return (
		<React.Fragment>
			<LoadoutItem
				key={ attachment.id } 
				item={ attachment } 
				category={ 'attachments' }
				canDelete={ editable }
				onDelete={ () => setIsDialogOpen(true) }
				textStyle={ {bottom: '-10px'} }
			/>	
					
			{ editable && <ConfirmDeleteDialog 
				isOpen={ isDialogOpen }
				title={ attachment.getTitle() }
				onConfirm={ () => deleteWeaponAttachment(weaponId, attachment.id) }
				onClose={ () => setIsDialogOpen(false) }
			/> }
		</React.Fragment>
	)
}

LoadoutWeaponAttachment.propTypes = {
	weaponId: PropTypes.string.isRequired,
	attachment: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
	}).isRequired
}

export default LoadoutWeaponAttachment