import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'

import Loader from '../../../shared/components/Loader'

import database from '../../../../firebase/database'

class AddPrimaryDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			form: {
				title: '',
				brand: ''
			},
			brands: [],
			loading: true,
			error: null
		}
	}

	resetForm() {
		this.setState({
			form: {
				title: '',
				brand: ''
			}
		})
	}

	componentDidMount() {
		database.brands
			.get()
			.then((brands) => this.setState({ brands, loading: false }))
			.catch((err) => this.setState({ error: err.message, loading: false }))
	}

	handleInputChange(e) {
		let prev = { ...this.state.form }
		let form = {
			...prev,
			[e.target.id || e.target.name]: e.target.value
		}

		this.setState({ form })
	}

	handleSave() {
		this.resetForm()
		this.props.onSave(this.state.form)
	}

	formValid() {
		let form = this.state.form

		return !!form.title
	}

	render() {
		let { brands, loading, error } = this.state

		return (
			<Dialog fullWidth={ true } open={ this.props.isOpen } onClose={ this.props.onClose }>
				<DialogTitle>Add primary</DialogTitle>

				<DialogContent>
					{loading ? (
						<Loader />
					) : error ? (
						<div className='error-alert'>{error}</div>
					) : (
						<React.Fragment>
							<TextField
								autoFocus={ true }
								id='title'
								label='Weapon name'
								type='text'
								fullWidth={ true }
								onChange={ (e) => this.handleInputChange(e) }
							/>

							<TextField
								label='Brand'
								fullWidth={ true }
								value={ this.state.form.brand }
								onChange={ (e) => this.handleInputChange(e) }
								select={ true }
								SelectProps={ {
									name: 'brand'
								} }
							>
								{brands.map((brand, idx) => (
									<MenuItem key={ brand } value={ brand }>
										{brand}
									</MenuItem>
								))}
							</TextField>
						</React.Fragment>
					)}
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
