import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import AttachmentSelect from './AttachmentSelect'
import database from '../../../../../../../../firebase/database'

class AddAttachmentDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			attachmentId: '',
			attachments: []
		}
	}	

	componentDidMount() {
		return database.attachments
			.get()
			.then((attachments) => this.setState({ attachments }))
	}

	getSelectableAttachments() {
		return this.state.attachments.filter((a) => this.props.filterIds.indexOf(a.id) === -1)
	}

	onAttachmentSelected(attachmentId) {
		this.setState({ attachmentId })
	}

	formValid() {
		return this.state.attachmentId
	}

	onSave(attachmentId) {
		this.setState({attachmentId: ''})
		this.props.onSave(attachmentId)
	}

	render() {
		let { attachmentId } = this.state
		let { weaponName, isOpen, onClose, onSave } = this.props

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>Add attachment to {weaponName} </DialogTitle>

				<DialogContent>
					<AttachmentSelect
						attachments={ this.getSelectableAttachments() } 
						selectedAttachmentId={ attachmentId } 
						onAttachmentSelected={ attachmentId => this.onAttachmentSelected(attachmentId) } 
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ this.props.onClose }>Cancel</Button>
					<Button
						disabled={ !this.formValid() }
						variant='contained'
						onClick={ () => onSave(this.state.attachmentId) }
						color='primary'
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

AddAttachmentDialog.propTypes = {
	weaponName: PropTypes.string.isRequired,
	filterIds: PropTypes.array,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

AddAttachmentDialog.defaultProps = {
	filterIds: []
}

export default AddAttachmentDialog
