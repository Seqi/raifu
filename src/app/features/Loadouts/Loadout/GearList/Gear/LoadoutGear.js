import React, {  useState } from 'react'
import PropTypes from 'prop-types'

import { GearCard } from 'app/shared/components/Cards/Entities'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'


export default function LoadoutGear ({ gear, onDelete }) {	
	let [ isDialogOpen, setIsDialogOpen ] = useState(false)

	return (
		<React.Fragment>
			<GearCard 
				key={ gear.id } 
				gear={ gear } 
				canDelete={ true } 
				onDelete={ () => setIsDialogOpen(true) }
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
