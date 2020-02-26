import React, { useState } from 'react'
import PropTypes from 'prop-types'

import DeleteButton from 'app/shared/buttons/DeleteButton'
import ConfirmDeleteDialog from 'app/shared/dialogs/ConfirmDeleteDialog'

let Deletable = ({ dialogTitle, canDelete, onDelete, absolute, children }) => {
	let [ isDialogOpen, setIsDialogOpen ] = useState(false)

	return (
		<React.Fragment>
			{ children }

			{ canDelete && (
				<React.Fragment>
					<DeleteButton absolute={ absolute } onClick={ () => setIsDialogOpen(true) } /> 

					<ConfirmDeleteDialog 
						isOpen={ isDialogOpen }
						title={ dialogTitle  }
						onConfirm={ onDelete }
						onClose={ () => setIsDialogOpen(false) }
					/> 
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

Deletable.propTypes = {
	absolute: PropTypes.bool,
	dialogTitle: PropTypes.string.isRequired,
	canDelete: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	style: PropTypes.object,
}

Deletable.defaultProps = {
	absolute: true,
	canDelete: false,
	style: {}
}

export default Deletable