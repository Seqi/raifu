import React, { useState } from 'react'
import PropTypes from 'prop-types'

import DeleteButton from 'app/shared/buttons/DeleteButton'
import ConfirmDeleteDialog from 'app/shared/dialogs/ConfirmDeleteDialog'

let Deletable = ({ dialogTitle, canDelete, onDelete, style, children }) => {
	let [ isDialogOpen, setIsDialogOpen ] = useState(false)

	return (
		<React.Fragment>
			{ children }

			{ canDelete && <DeleteButton style={ style } onClick={ () => setIsDialogOpen(true) } /> }

			{ canDelete && <ConfirmDeleteDialog 
				isOpen={ isDialogOpen }
				title={ dialogTitle  }
				onConfirm={ onDelete }
				onClose={ () => setIsDialogOpen(false) }
			/> }
		</React.Fragment>
	)
}

Deletable.propTypes = {
	dialogTitle: PropTypes.string.isRequired,
	canDelete: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	style: PropTypes.object,
}

Deletable.defaultProps = {
	canDelete: false,
	style: {}
}

export default Deletable