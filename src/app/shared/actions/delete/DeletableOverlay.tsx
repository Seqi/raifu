import React, { useState, useCallback, FC } from 'react'
import PropTypes from 'prop-types'

import { Box } from '@material-ui/core'

import { DeleteButton, ConfirmDeleteDialog } from 'app/shared/actions/delete'

type DeletableOverlayProps = {
	dialogTitle: string
	canDelete?: boolean
	onDelete: () => any
}

const DeletableOverlay: FC<DeletableOverlayProps> = ({
	dialogTitle,
	canDelete,
	onDelete,
	children,
}) => {
	let [isDialogOpen, setIsDialogOpen] = useState(false)

	let onDeleteClicked = useCallback((event) => {
		event.stopPropagation()
		setIsDialogOpen(true)
	}, [])

	return (
		<React.Fragment>
			{children}

			{canDelete && (
				<Box position='absolute' top={ 0 } right={ 0 }>
					<DeleteButton onClick={ onDeleteClicked } />

					<ConfirmDeleteDialog
						isOpen={ isDialogOpen }
						title={ dialogTitle }
						onConfirm={ onDelete }
						onClose={ () => setIsDialogOpen(false) }
					/>
				</Box>
			)}
		</React.Fragment>
	)
}

DeletableOverlay.propTypes = {
	dialogTitle: PropTypes.string.isRequired,
	canDelete: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
}

DeletableOverlay.defaultProps = {
	canDelete: false,
}

export default DeletableOverlay
