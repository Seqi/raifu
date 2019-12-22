import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { Error } from 'app/shared'
import { GearSelect } from 'app/shared/selects'

class AddGearDialog extends React.Component {
	constructor(props) {
		super(props)
		this.state = this.defaultState
	}

	get defaultState() {
		return {
			gear: { 
				brand: '',
				type: '',
				platform: '',
				model: '',
				nickname: ''
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
			let gear = {
				...prevState.gear,
				[key]: val
			}

			// Reset platform if type changes
			if (key === 'type') {
				gear.platform = ''
			}

			return { gear }
		})
	}

	handleSave() {
		this.setState({loading: true, error: null}, () => {
			this.props.onSave(this.state.gear)
				.then(() => this.handleClose())
				.catch(err => this.setState({ error: 'An error occurred while adding gear.', loading: false }))
		})		
	}

	handleClose() {
		this.props.onClose()
		this.setState(this.defaultState)
	}

	formValid() {
		let { platform, nickname } = this.state.gear

		return platform || nickname
	}

	render() {
		let { error, loading } = this.state 
		
		return (
			<Dialog fullWidth={ true } open={ this.props.isOpen } onClose={ () => this.handleClose() }>
				<DialogTitle>Add gear</DialogTitle>

				<DialogContent>
					{ error && <Error error={ error } fillBackground={ true } style={ { padding: '8px 0', marginBottom: '8px' } } /> }
					
					<GearSelect onChange={ (e) => this.handleInputChange(e) } />
					
					<TextField
						id='brand'
						label='Brand'
						type='text'
						fullWidth={ true }
						onChange={ (e) => this.handleInputChange(e) }
						value={ this.state.brand }
					/>

					<TextField
						id='model'
						label='Model'
						type='text'
						fullWidth={ true }
						onChange={ (e) => this.handleInputChange(e) }
						helperText='E.g. Raider 2.0, Trident MK-II, Nighthawk'
					/>

					<TextField
						id='nickname'
						label='Nickname'
						type='text'
						fullWidth={ true }
						onChange={ (e) => this.handleInputChange(e) }
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ () => this.handleClose() }>Cancel</Button>
					<Button
						disabled={ !this.formValid() || loading }
						variant='contained'
						color='primary'
						onClick={ () => this.handleSave() }
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

AddGearDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

export default AddGearDialog
