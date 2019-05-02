import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import WeaponSelect from './WeaponSelect'
import database from '../../../../../../firebase/database'

class AddWeaponDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			weaponId: '',
			weapons: []
		}
	}

	componentDidMount() {
		return database.weapons
			.get()
			.then((weapons) => this.setState({ weapons }))
	}

	getSelectableWeapons() {
		return this.state.weapons.filter((w) => this.props.filterIds.indexOf(w.id) === -1)
	}

	onWeaponSelected(weaponId) {
		this.setState({ weaponId })
	}

	formValid() {
		return this.state.weaponId
	}

	onSave(weaponId) {
		this.setState({weaponId: ''})
		this.props.onSave(weaponId)
	}

	render() {
		let { weaponId } = this.state
		let { isOpen, onClose } = this.props

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>Add weapon to loadout</DialogTitle>

				<DialogContent>
					<WeaponSelect 
						weapons={ this.getSelectableWeapons() } 
						selectedWeaponId={ weaponId } 
						onWeaponSelected={ weaponId => this.onWeaponSelected(weaponId) } /
					>
				</DialogContent>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button
						disabled={ !this.formValid() }
						variant='contained'
						onClick={ () => this.onSave(weaponId) }
						color='primary'
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

AddWeaponDialog.propTypes = {
	filterIds: PropTypes.array,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

AddWeaponDialog.defaultProps = {
	filterIds: []
}

export default AddWeaponDialog
