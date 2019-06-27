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

import { Error } from 'app/shared/components'

class EditEventDialog extends Component {
	constructor(props) {
		super(props)

		this.state = {
			event: {
				name: props.event.name,
				location: props.event.location,
				date: props.date || props.event.date
			},
			loading: false,
			error: null
		}
	}	

	handleInputChange(e) {
		// Synthetic event data is lost when callback occurs so store
		let key = e.target.id || e.target.name
		let val = e.target.value

		this.setState(prevState => {
			let event = {
				...prevState.event,
				[key]: val
			}

			return { event }
		})
	}

	handleSave() {
		this.setState({ loading: true, error: null }, () => {
			this.props.onSave(this.state.event)
				.catch(err => this.setState({ error: err.statusText || err.message || err, loading: false }))
		})
	}

	formValid() {
		let { name, location, date} = this.state.event

		return name && location && date
	}

	render() {
		let { name, location, date } = this.state.event
		let { error, loading } = this.state

		return (
			<Dialog fullWidth={ true } open={ this.props.isOpen } onClose={ this.props.onClose }>
				<DialogTitle>{ this.props.event.date ? 'Edit' : 'Add' } event</DialogTitle>

				<DialogContent>
					{ error && <Error error={ error } fillBackground={ true } style={ { padding: '8px 0', marginBottom: '8px' } } /> }

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
						disabled={ !this.formValid() || loading }
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
	date: PropTypes.instanceOf(Date),
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
	date: null,
	event: {
		name: '',
		location: '',
		date: null
	}
}

export default EditEventDialog
