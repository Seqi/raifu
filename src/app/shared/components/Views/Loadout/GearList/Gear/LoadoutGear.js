import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import LoadoutItem from 'app/shared/components/Display/LoadoutItem'

export default function LoadoutGear ({ gear, onDelete }) {	
	let [ isDialogOpen, setIsDialogOpen ] = useState(false)

	return (
		<React.Fragment>
			<LoadoutItem
				key={ gear.id } 
				item={ gear } 
				category={ 'gear' }
				onDelete={ () => setIsDialogOpen(true) }
				textStyle={ {bottom: '-10px'} }
			/>	
					
			<ConfirmDeleteDialog 
				isOpen={ isDialogOpen }
				title={ gear.getTitle() }
				onConfirm={ () => onDelete(gear.id) }
				onClose={ () => setIsDialogOpen(false) }
			/>
		</React.Fragment>
	)
}

LoadoutGear.propTypes = {
	gear: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		model: PropTypes.string,
		brand: PropTypes.string,
		nickname: PropTypes.string,
		type: PropTypes.string
	}).isRequired,
	onDelete: PropTypes.func
}

LoadoutGear.defaultProps = {
	onDelete: (gearId) => {}
}
