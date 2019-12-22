import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ConfirmDeleteDialog from 'app/shared/dialogs/ConfirmDeleteDialog'
import LoadoutItem from 'app/shared/display/LoadoutItem/LoadoutItem'

export default function LoadoutGear ({ gear, canDelete, onDelete }) {	
	let [ isDialogOpen, setIsDialogOpen ] = useState(false)

	return (
		<React.Fragment>
			<LoadoutItem
				key={ gear.id } 
				item={ gear } 
				category={ 'gear' }
				canDelete={ canDelete }
				onDelete={ () => setIsDialogOpen(true) }
				textStyle={ {bottom: '-10px'} }
			/>	
					
			{ canDelete && <ConfirmDeleteDialog 
				isOpen={ isDialogOpen }
				title={ gear.getTitle() }
				onConfirm={ () => onDelete(gear.id) }
				onClose={ () => setIsDialogOpen(false) }
			/> }
		</React.Fragment>
	)
}

LoadoutGear.propTypes = {
	gear: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired
	}).isRequired,
	canDelete: PropTypes.bool,
	onDelete: PropTypes.func
}

LoadoutGear.defaultProps = {
	canDelete: false,
	onDelete: (gearId) => {}
}
