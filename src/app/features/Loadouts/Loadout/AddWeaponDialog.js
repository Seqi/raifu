import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import ResourceSelect from '../../../shared/components/Selects/ResourceSelect'
import database from '../../../../firebase/database'

class AddWeaponDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			weaponId: ''
		}
	}

	handleChange(e) {
		this.setState({ weaponId: e.target.value })
	}

	formValid() {
		return this.state.weaponId
	}

	filterWeapons() {
		return database[this.props.weaponType].get()
			.then((snap) => {
				let weapons = snap.val()

				this.props.filterIds.forEach((id) => {
					delete weapons[id]
				})

				// Hacky
				return { val: () => weapons }
			})
	}

	render() {
		let { isOpen, onClose, onSave } = this.props

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>Add weapon to loadout</DialogTitle>

				<DialogContent>
					<ResourceSelect
						label='Select weapon'
						name='weapon'
						dataGetter={ () => this.filterWeapons() }
						buildValue={ (weapon) => weapon.nickname || `${weapon.platform} ${weapon.model}` }
						value={ this.state.weaponId }
						onChange={ (e) => this.handleChange(e) }
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ this.props.onClose }>Cancel</Button>
					<Button
						disabled={ !this.formValid() }
						variant='contained'
						onClick={ () => onSave(this.state.weaponId) }
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
	weaponType: PropTypes.oneOf(['primaries', 'secondaries']).isRequired,
	filterIds: PropTypes.array,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

AddWeaponDialog.defaultProps = {
	filterIds: []
}

export default AddWeaponDialog
