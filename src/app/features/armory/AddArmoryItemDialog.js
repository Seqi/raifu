import React from 'react'
import PropTypes from 'prop-types'

import { 
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button
} from '@material-ui/core'

import { Autocomplete } from '@material-ui/lab'

import { Error } from 'app/shared/state'
import ResourceSelect from 'app/shared/resources/ResourceSelect'

import { brands, platforms } from 'app/data/constants'

class AddArmoryItemDialog extends React.Component {
	constructor(props) {
		super(props)
		this.state = this.defaultState
	}

	get defaultState() {
		return {
			resource: { 
				brand: null,
				type: null,
				platform: null,
				model: null,
				nickname: null
			},
			loading: false,
			error: null
		}
	}

	updateResource(key, val) {
		this.setState(prevState => {
			let resource = {
				...prevState.resource,
				[key]: val
			}

			return { resource }
		})
	}

	handleResourceChange(resource) {
		this.setState(prevState => {
			let updatedResource = {
				...prevState.resource,
				type: resource && resource.type,
				platform: resource && resource.platform
			}

			return { resource: updatedResource }
		})
	}

	handleInputChange(e) {
		// Synthetic event data is lost when callback occurs so store
		let key = e.target.id || e.target.name
		let val = e.target.value

		this.updateResource(key, val)
	}

	handleSave() {
		this.setState({loading: true, error: null}, () => {
			this.props.onSave(this.state.resource)
				.then(() => this.handleClose())
				.catch(err => this.setState({ error: 'An error occurred while adding.', loading: false }))
		})		
	}

	handleClose() {
		this.setState(this.defaultState, () => this.props.onClose())
	}

	formValid() {
		let { platform, nickname } = this.state.resource
		return platform || nickname
	}

	render() {
		let { error, loading } = this.state
		let { resourceTitle, resourceKey, resourceName } = this.props
		
		return (
			<Dialog fullWidth={ true } open={ this.props.isOpen } onClose={ () => this.handleClose() }>
				<DialogTitle>Add {resourceTitle}</DialogTitle>

				<DialogContent>
					{ error && <Error error={ error } fillBackground={ true } /> }

					<ResourceSelect
						resourceOptions={ platforms[resourceKey] } 
						getOptionLabel={ option => option.resource }
						groupBy={ option => option.type }
						onChange={ (value) => this.handleResourceChange(value) }
						renderInput={ params => (
							<TextField { ...params } fullWidth={ true } label={ resourceName } />
						) }
					/>

					<Autocomplete
						options={ brands }
						freeSolo={ true }
						onInputChange={ (evt, val) => this.updateResource('brand', val) }
						renderInput={ params => (
							<TextField { ...params } fullWidth={ true } label='Brand'/>
						) }
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

AddArmoryItemDialog.propTypes = {
	resourceTitle: PropTypes.string.isRequired,
	resourceKey: PropTypes.string.isRequired,
	resourceName: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

export default AddArmoryItemDialog
