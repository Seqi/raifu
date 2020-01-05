import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ConfirmDeleteDialog from 'app/shared/dialogs/ConfirmDeleteDialog'
import LoadoutItem from 'app/shared/images/LoadoutItem'

export default function LoadoutResourceItem ({ resourceType, item, canDelete, onDelete }) {	
	let [ isDialogOpen, setIsDialogOpen ] = useState(false)

	return (
		<React.Fragment>
			<LoadoutItem
				key={ item.id } 
				item={ item } 
				category={ resourceType }
				canDelete={ canDelete }
				onDelete={ () => setIsDialogOpen(true) }
				textStyle={ { bottom: '-10px' } }
			/>	
					
			{ canDelete && <ConfirmDeleteDialog 
				isOpen={ isDialogOpen }
				title={ item.getTitle() }
				onConfirm={ () => onDelete(item.id) }
				onClose={ () => setIsDialogOpen(false) }
			/> }
		</React.Fragment>
	)
}

LoadoutResourceItem.propTypes = {
	resourceType: PropTypes.oneOf(['clothing', 'gear']).isRequired,
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired
	}).isRequired,
	canDelete: PropTypes.bool,
	onDelete: PropTypes.func
}

LoadoutResourceItem.defaultProps = {
	canDelete: false,
	onDelete: (itemId) => {}
}
