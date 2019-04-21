import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import ResourceSelect from 'app/shared/components/Selects/ResourceSelect'
import database from '../../../../firebase/database'

class AddAttachmentDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			attachmentId: ''
		}
	}

	handleChange(e) {
		this.setState({ attachmentId: e.target.value })
	}

	formValid() {
		return this.state.attachmentId
	}

	filterAttachments() {
		return database.attachments
			.get()
			.then((attachments) => attachments.filter((w) => this.props.filterIds.indexOf(w.id) === -1))
	}

	render() {
		let { weaponName, isOpen, onClose, onSave } = this.props

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>Add attachment to {weaponName} </DialogTitle>

				<DialogContent>
					<ResourceSelect
						label='Select attachment'
						name='attachment'
						dataGetter={ () => this.filterAttachments() }
						buildValue={ item => item.getTitle() }
						value={ this.state.attachmentId }
						onChange={ (e) => this.handleChange(e) }
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
