import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { Error } from 'app/shared/components'
import { ResourceSelect, WeaponSelect } from 'app/shared/components/selects'

import database from '../../../../firebase/database'

class AddWeaponDialog extends React.Component {
	constructor(props) {
		super(props)
		this.state = this.defaultState
	}

	get defaultState() {
		return {
			weapon: { 
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
			let weapon = {
				...prevState.weapon,
				[key]: val
			}

			// Reset platform if type changes
			if (key === 'type') {
				weapon.platform = ''
			}

			return { weapon }
		})
	}

	handleSave() {
		this.setState({loading: true, error: null}, () => {
			this.props.onSave(this.state.weapon)
				.then(() => this.handleClose())
				.catch(err => this.setState({ error: 'An error occurred while adding weapon.', loading: false }))
		})		
	}

	handleClose() {
		this.props.onClose()
		this.setState(this.defaultState)
	}

	formValid() {
		let { platform, nickname } = this.state.weapon

		return platform || nickname
	}

	render() {
		let { error, loading } = this.state 
		
		return (
			<Dialog fullWidth={ true } open={ this.props.isOpen } onClose={ () => this.handleClose() }>
				<DialogTitle>Add weapon</DialogTitle>

				<DialogContent>
					{ error && <Error error={ error } fillBackground={ true } style={ { padding: '8px 0', marginBottom: '8px' } } /> }
					
					<WeaponSelect onChange={ (e) => this.handleInputChange(e) } />

					<ResourceSelect
						label='Brand'
						name='brand'
						dataGetter={ () => Promise.resolve(database.brands) }
						onChange={ (e) => this.handleInputChange(e) }
						value={ this.state.weapon.brand }
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

AddWeaponDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

export default AddWeaponDialog
