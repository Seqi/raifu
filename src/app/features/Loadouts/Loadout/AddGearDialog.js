import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import ResourceSelect from 'app/shared/components/Selects/ResourceSelect'
import database from '../../../../firebase/database'

class AddGearDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			gearId: ''
		}
	}

	handleChange(e) {
		this.setState({ gearId: e.target.value })
	}

	formValid() {
		return this.state.gearId
	}

	filterGear() {
		return database.gear
			.get()
			.then((gear) => gear.filter((w) => this.props.filterIds.indexOf(w.id) === -1))
	}

	render() {
		let { isOpen, onClose, onSave } = this.props

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>Add gear to loadout</DialogTitle>

				<DialogContent>
					<ResourceSelect
						label='Select gear'
						name='gear'
						dataGetter={ () => this.filterGear() }
						buildValue={ (gear) => gear.nickname || `${gear.platform} ${gear.model}` }
						value={ this.state.gearId }
						onChange={ (e) => this.handleChange(e) }
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ this.props.onClose }>Cancel</Button>
					<Button
						disabled={ !this.formValid() }
						variant='contained'
						onClick={ () => onSave(this.state.gearId) }
						color='primary'
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

AddGearDialog.propTypes = {
	filterIds: PropTypes.array,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

AddGearDialog.defaultProps = {
	filterIds: []
}

export default AddGearDialog
