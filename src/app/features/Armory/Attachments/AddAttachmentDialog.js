import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import AttachmentSelect from '../../../shared/components/Selects/AttachmentSelect'

class AddAttachmentDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			type: '',
			platform: ''
		}
	}

	handleFormChange(e) {
		console.log('target', e.target)
		this.setState({ [e.target.id || e.target.name]: e.target.value })
	}

	handleSave() {
		this.props.onSave(this.state)
	}

	render() {
		return (
			<Dialog fullWidth={ true } open={ this.props.isOpen } onClose={ this.props.onClose }>
				<DialogTitle color='primary'>Add attachment</DialogTitle>

				<DialogContent>
					<AttachmentSelect onChange={ (e) => this.handleFormChange(e) } />
				</DialogContent>

				<DialogActions>
					<Button onClick={ this.props.onClose }>Cancel</Button>
					<Button variant='contained' onClick={ () => this.handleSave() } color='primary'>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

AddAttachmentDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

export default AddAttachmentDialog
