import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

class ConfirmDeleteDialog extends Component {

	handleConfirm() {
		this.props.onConfirm()
	}

	render() {
		let { onClose, isOpen, title } = this.props

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>Delete { title }?</DialogTitle>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button
						variant='contained'
						onClick={ () => this.handleConfirm() }
						color='primary'
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

ConfirmDeleteDialog.propTypes = {
	title: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired
}

export default ConfirmDeleteDialog
