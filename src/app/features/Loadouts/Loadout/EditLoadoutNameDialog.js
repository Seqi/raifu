import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { Error } from 'app/shared/components'

class EditLoadoutNameDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loadout: {
				name: this.props.name
			},
			loading: false,
			error: null
		}
	}

	handleChange(e) {
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

	formValid() {
		return this.state.loadout.name
	}

	handleSave() {
		this.setState({loading: true, error: null}, () => {
			this.props.onSave(this.state.loadout.name)
				.then(() => this.setState({ loading: false, error: null }))
				.catch(err => this.setState({ error: err.message || err, loading: false }))
		})	
		
	}

	render() {
		let { isOpen, onClose } = this.props
		let { loading, error, loadout } = this.state

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>Change loadout name</DialogTitle>

				<DialogContent>					
					{ error && <Error error={ error } fillBackground={ true } style={ { padding: '8px 0', marginBottom: '8px' } } /> }

					<TextField
						label='Name'
						name='name'
						value={ loadout.name }
						fullWidth={ true }
						autoFocus={ true }
						onChange={ (e) => this.handleChange(e) }
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
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

EditLoadoutNameDialog.propTypes = {
	name: PropTypes.string,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

EditLoadoutNameDialog.defaultProps = {
	name: ''
}

export default EditLoadoutNameDialog
