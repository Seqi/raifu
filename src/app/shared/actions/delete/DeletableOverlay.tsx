import React, { useState, useCallback, FC } from 'react'
import PropTypes from 'prop-types'

import { Box, styled } from '@material-ui/core'

import { DeleteButton, ConfirmDeleteDialog } from 'app/shared/actions/delete'

type DeletableOverlayProps = {
	dialogTitle: string
	canDelete?: boolean
	onDelete: () => any
}

const DeletableOverlayContainer = styled(Box)(({ theme }) => ({
	position: 'absolute',

	top: 0,
	right: 0,

	[theme.breakpoints.down('xs')]: {
		top: '-2px',
		right: '1px',
	},
}))

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
		<>
			{children}

			{canDelete && (
				<DeletableOverlayContainer>
					<DeleteButton onClick={ onDeleteClicked } />

					<ConfirmDeleteDialog
						isOpen={ isDialogOpen }
						title={ dialogTitle }
						onConfirm={ onDelete }
						onClose={ () => setIsDialogOpen(false) }
					/>
				</DeletableOverlayContainer>
			)}
		</>
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
