import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import LoadoutItem from 'app/shared/components/Display/LoadoutItem'

export default function LoadoutWeaponAttachment ({ attachment, canEdit, onDelete }) {	
	let [ isDialogOpen, setIsDialogOpen ] = useState(false)

	return (
		<React.Fragment>
			<LoadoutItem
				key={ attachment.id } 
				item={ attachment } 
				category={ 'attachments' }
				canDelete={ canEdit }
				onDelete={ () => setIsDialogOpen(true) }
				textStyle={ {bottom: '-10px'} }
			/>	
					
			{ canEdit && <ConfirmDeleteDialog 
				isOpen={ isDialogOpen }
				title={ attachment.getTitle() }
				onConfirm={ () => onDelete(attachment.id) }
				onClose={ () => setIsDialogOpen(false) }
			/> }
		</React.Fragment>
	)
}

LoadoutWeaponAttachment.propTypes = {
	attachment: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		model: PropTypes.string,
		brand: PropTypes.string,
		nickname: PropTypes.string,
		type: PropTypes.string
	}).isRequired,
	canEdit: PropTypes.bool,
	onDelete: PropTypes.func
}

LoadoutWeaponAttachment.defaultProps = {
	canEdit: false,
	onDelete: (gearId) => {}
}
