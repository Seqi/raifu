import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { ResourceSelect, WeaponSelect } from '../../../shared/components/Selects'

import database from '../../../../firebase/database'

class AddSecondaryDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			brand: '',
			type: '',
			platform: '',
			model: '',
			nickname: ''
		}
	}

	handleInputChange(e) {
		this.setState({ [e.target.id || e.target.name]: e.target.value })
	}

	handleSave() {
		this.props.onSave(this.state)
	}

	formValid() {
		let { platform, nickname } = this.state

		return platform || nickname
	}

	render() {
		return (
			<Dialog fullWidth={ true } open={ this.props.isOpen } onClose={ this.props.onClose }>
				<DialogTitle>Add primary</DialogTitle>

				<DialogContent>
					<WeaponSelect
						allowedTypes={ ['pistols', 'smgs', 'shotguns'] }
						onChange={ (e) => this.handleInputChange(e) }
					/>

					<ResourceSelect
						label='Brand'
						name='brand'
						dataGetter={ database.brands.get }
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

AddSecondaryDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

export default AddSecondaryDialog
