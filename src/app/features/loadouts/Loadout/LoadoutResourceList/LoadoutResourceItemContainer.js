import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ConfirmDeleteDialog from 'app/shared/dialogs/ConfirmDeleteDialog'
import DeleteButton from 'app/shared/buttons/DeleteButton'
import LoadoutResourceItem from './LoadoutResourceItem'

import './LoadoutResourceItemContainer.css'

export default function LoadoutResourceItemContainer ({ resourceType, item, canDelete, onDelete }) {	
	let [ isDialogOpen, setIsDialogOpen ] = useState(false)

	return (
		<React.Fragment>
			<div className='loadout-item'>
				{ canDelete && <DeleteButton style={ {top: '10px'} } onClick={ onDelete } /> }
				
				<LoadoutResourceItem item={ item } resourceType={ resourceType } />		
			</div>
					
			{ canDelete && <ConfirmDeleteDialog 
				isOpen={ isDialogOpen }
				title={ item.getTitle() }
				onConfirm={ () => onDelete(item.id) }
				onClose={ () => setIsDialogOpen(false) }
			/> }
		</React.Fragment>
	)
}

LoadoutResourceItemContainer.propTypes = {
	resourceType: PropTypes.oneOf(['clothing', 'gear', 'attachments']).isRequired,
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired
	}).isRequired,
	canDelete: PropTypes.bool,
	onDelete: PropTypes.func
}

LoadoutResourceItemContainer.defaultProps = {
	canDelete: false,
	onDelete: (itemId) => {}
}
