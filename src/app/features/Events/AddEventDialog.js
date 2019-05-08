import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'

class AddLoadoutDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			location: '',
			date: new Date()
		}
	}

	handleInputChange(e) {
		this.setState({ [e.target.id || e.target.name]: e.target.value })
	}

	handleSave() {
		this.props.onSave(this.state)
	}

	formValid() {
		let { name, location, date} = this.state

		return name && location && date
	}

	render() {
		return (
			<Dialog fullWidth={ true } open={ this.props.isOpen } onClose={ this.props.onClose }>
				<DialogTitle>Add loadout</DialogTitle>

				<DialogContent>
					<TextField
						id='name'
						label='Name'
						type='text'
						fullWidth={ true }
						onChange={ (e) => this.handleInputChange(e) }
					/>

					<TextField
						id='location'
						label='Location'
						type='text'
						fullWidth={ true }
						onChange={ (e) => this.handleInputChange(e) }
					/>

					<MuiPickersUtilsProvider utils={ MomentUtils }>
	    			  <DateTimePicker
							variant='standard'
							fullWidth={true}
							value={ this.state.date }
							label='Date'
							onChange={ (e) => this.handleInputChange(e) }
						/> 
					</MuiPickersUtilsProvider>
				</DialogContent>

				<DialogActions>
					<Button onClick={ this.props.onClose }>Cancel</Button>
					<Button
						disabled={ !this.formValid() }
						variant='contained'
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

AddLoadoutDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

export default AddLoadoutDialog
