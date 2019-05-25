import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import { Loading, Error } from 'app/shared/components'
import GearSelect from './GearSelect'
import database from '../../../../../../../firebase/database'

class AddGearDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			gearId: '',
			gear: [],
			loading: false,
			errorOnLoad: null,
			errorOnSave: null
		}
	}

	componentDidMount = () => this.loadGear()

	loadGear() {
		this.setState({ loading: true, errorOnLoad: null }, () => {
			database.gear
				.get()
				.then((gear) => this.setState({ gear, loading: false }))
				.catch((err) => this.setState( { errorOnLoad: err.message || err, loading: false}))
		})
	}

	getSelectableGear() {
		return this.state.gear.filter((g) => this.props.filterIds.indexOf(g.id) === -1)
	}

	onGearSelected(gearId) {
		this.setState({ gearId })
	}

	formValid() {
		return this.state.gearId
	}

	onSave(gearId) {
		this.setState({ loading: true, errorOnSave: false }, () => {
			this.props.onSave(gearId)
				.then(() => this.setState({ gearId: '', loading: false }))
				.catch(err => this.setState({ loading: false, errorOnSave: err }))
		})
	}

	render() {
		let { gearId, loading, errorOnLoad, errorOnSave } = this.state
		let { isOpen, onClose } = this.props

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>Add gear to loadout</DialogTitle>

				<DialogContent>			
					{ loading && <Loading /> }

					{ errorOnLoad && <Error error={ errorOnLoad } onRetry={ () => this.loadGear() } /> }
					{ errorOnSave && <Error error={ errorOnSave } fillBackground={ true } style={ { padding: '8px 0', marginBottom: '8px' } } /> }

					<GearSelect 
						gear={ this.getSelectableGear() } 
						selectedGearId={ gearId } 
						onGearSelected={ gearId => this.onGearSelected(gearId) } /
					>
				</DialogContent>

				<DialogActions>
					<Button onClick={ this.props.onClose }>Cancel</Button>
					<Button
						disabled={ !this.formValid() }
						variant='contained'
						onClick={ () => this.onSave(this.state.gearId) }
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
