import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

class ConfirmDeleteDialog extends React.PureComponent {
	render() {
		let { verb, onClose, onConfirm, isOpen, title } = this.props

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>{ verb } { title }?</DialogTitle>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button
						variant='contained'
						onClick={ onConfirm }
						color='primary'
					>
						{ verb }
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

ConfirmDeleteDialog.propTypes = {
	title: PropTypes.string.isRequired,
	verb: PropTypes.oneOf(['Delete', 'Remove']),
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired
}

ConfirmDeleteDialog.defaultProps = {
	verb: 'Delete'
}

export default ConfirmDeleteDialog
