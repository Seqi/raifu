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

class EditEventDialog extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			name: props.event.name,
			location: props.event.location,
			date: props.event.date
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
		let { name, location, date } = this.state 
		return (
			<Dialog fullWidth={ true } open={ this.props.isOpen } onClose={ this.props.onClose }>
				<DialogTitle>Add loadout</DialogTitle>

				<DialogContent>
					<TextField
						id='name'
						label='Name'
						type='text'
						fullWidth={ true }
						value={ name }
						onChange={ (e) => this.handleInputChange(e) }
					/>

					<TextField
						id='location'
						label='Location'
						type='text'
						fullWidth={ true }
						value={ location }
						onChange={ (e) => this.handleInputChange(e) }
					/>

					<MuiPickersUtilsProvider utils={ MomentUtils }>
						<DateTimePicker 
							id='date'
							variant='standard' 
							fullWidth={ true } 
							value={ date } 
							label='Date' 
							onChange={ (date) => this.handleInputChange({ target: { id: 'date', value: date.toDate() }}) } 
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

EditEventDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,	
	event: PropTypes.shape({
		name: PropTypes.string.isRequired,
		date: PropTypes.object,
		location: PropTypes.string.isRequired
	})
}

EditEventDialog.defaultProps = {
	event: {
		name: '',
		location: '',
		date: new Date()
	}
}

export default EditEventDialog
