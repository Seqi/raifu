import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { Box } from '@material-ui/core'

import { DeleteButton, ConfirmDeleteDialog } from 'app/shared/actions/delete'

let Deletable = ({ dialogTitle, canDelete, onDelete, children }) => {
	let [isDialogOpen, setIsDialogOpen] = useState(false)

	let onDeleteClicked = useCallback((event) => {
		event.stopPropagation()
		setIsDialogOpen(true)
	}, [])

	return (
		<React.Fragment>
			{children}

			{canDelete && (
				<Box position='absolute' top={0} right={0}>
					<DeleteButton onClick={onDeleteClicked} />

					<ConfirmDeleteDialog
						isOpen={isDialogOpen}
						title={dialogTitle}
						onConfirm={onDelete}
						onClose={() => setIsDialogOpen(false)}
					/>
				</Box>
			)}
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
	style: {},
}

export default Deletable
