import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import ResourceSelect from '../../../shared/components/Selects/ResourceSelect';

import database from '../../../../firebase/database'

class AddPrimaryDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			brand: ''
		}		
	}

	handleInputChange(e) {
		this.setState({[e.target.id || e.target.name]: e.target.value})
	}

	handleSave() {
		this.resetForm()
		this.props.onSave(this.state)
	}

	formValid() {
		return !!this.state.title
	}

	render() {
		let { brand } = this.state

		return (
			<Dialog fullWidth={ true } open={ this.props.isOpen } onClose={ this.props.onClose }>
				<DialogTitle>Add primary</DialogTitle>

				<DialogContent>
					<TextField
						autoFocus={ true }
						id='title'
						label='Weapon name'
						type='text'
						fullWidth={ true }
						onChange={ (e) => this.handleInputChange(e) }
					/>

					<ResourceSelect
						label='brand'
						name='brand' 
						dataGetter={database.brands.get}
						onChange={e => this.handleInputChange(e)} 
						value={brand} />
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

AddPrimaryDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

export default AddPrimaryDialog
