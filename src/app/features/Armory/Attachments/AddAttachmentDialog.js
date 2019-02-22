import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import AttachmentSelect from '../../../shared/components/Selects/AttachmentSelect'

class AddAttachmentDialog extends Component {
	constructor(props) {
		super(props)
		this.state = this.defaultState
	}

	get defaultState() {
		return {
			type: '',
			platform: '',
			brand: '',
			model: '',
			nickname: ''
		}
	}

	handleFormChange(e) {
		this.setState({ [e.target.id || e.target.name]: e.target.value })
	}

	handleSave() {
		this.props.onSave(this.state)
		this.setState(this.defaultState)
	}

	handleClose() {
		this.props.onClose()
		this.setState(this.defaultState)
	}

	formValid() {
		let { type, platform } = this.state

		return type && platform
	}

	render() {
		return (
			<Dialog fullWidth={ true } open={ this.props.isOpen } onClose={ () => this.handleClose() }>
				<DialogTitle color='primary'>Add attachment</DialogTitle>

				<DialogContent>
					<AttachmentSelect onChange={ (e) => this.handleFormChange(e) } />

					<TextField
						id='brand'
						label='Brand'
						type='text'
						fullWidth={ true }
						onChange={ (e) => this.handleFormChange(e) }
					/>

					<TextField
						id='model'
						label='Model'
						type='text'
						fullWidth={ true }
						onChange={ (e) => this.handleFormChange(e) }
						helperText='E.g. TRMR, Bocca, NX400'
					/>

					<TextField
						id='nickname'
						label='Nickname'
						type='text'
						fullWidth={ true }
						onChange={ (e) => this.handleFormChange(e) }
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ this.props.onClose }>Cancel</Button>
					<Button
						variant='contained'
						disabled={ !this.formValid() }
						onClick={ () => this.handleSave() }
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
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

export default AddAttachmentDialog
