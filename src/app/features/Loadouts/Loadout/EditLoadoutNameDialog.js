import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class EditLoadoutNameDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: ''
		}
	}

	handleChange(e) {
		this.setState({ name: e.target.value })
	}

	formValid() {
		return this.state.name
	}

	render() {
		let { isOpen, onClose, onSave } = this.props

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>Change loadout name</DialogTitle>

				<DialogContent>
					<TextField
						label='Name'
						name='name'
						value={ this.state.name }
						fullWidth={ true }
						autoFocus={ true }
						onChange={ (e) => this.handleChange(e) }
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ this.props.onClose }>Cancel</Button>
					<Button
						disabled={ !this.formValid() }
						variant='contained'
						onClick={ () => onSave(this.state.name) }
						color='primary'
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

EditLoadoutNameDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

export default EditLoadoutNameDialog
