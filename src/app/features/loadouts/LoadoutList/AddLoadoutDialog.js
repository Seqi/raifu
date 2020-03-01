import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { Error } from 'app/shared/state'

class AddLoadoutDialog extends React.Component {
	constructor(props) {
		super(props)
		this.state = this.defaultState
	}

	get defaultState() {
		return {
			loadout: {
				name: ''
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
			let loadout = {
				...prevState.loadout,
				[key]: val
			}

			return { loadout }
		})
	}

	handleSave() {
		this.setState({ loading: true, error: null }, () => {
			this.props.onSave(this.state.loadout)
				.then(() => this.handleClose())
				.catch(err => this.setState({ error: 'An error occurred while adding loadout.', loading: false }))
		})	
	}

	handleClose() {
		this.props.onClose()
		this.setState(this.defaultState)
	}

	formValid() {
		let { name } = this.state.loadout

		return name
	}

	render() {
		let { error, loading } = this.state

		return (
			<Dialog fullWidth={ true } open={ this.props.isOpen } onClose={ this.props.onClose }>
				<DialogTitle>Add loadout</DialogTitle>

				<DialogContent>
					{ error && <Error error={ error } fillBackground={ true } /> }

					<TextField
						id='name'
						label='Name'
						type='text'
						fullWidth={ true }
						onChange={ (e) => this.handleInputChange(e) }
						value={ this.state.loadout.name }
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ () => this.handleClose() }>Cancel</Button>
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

AddLoadoutDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

export default AddLoadoutDialog
