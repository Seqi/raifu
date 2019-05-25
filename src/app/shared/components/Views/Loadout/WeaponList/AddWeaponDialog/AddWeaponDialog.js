import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import { Loading, Error } from 'app/shared/components'
import WeaponSelect from './WeaponSelect'
import database from '../../../../../../../firebase/database'

class AddWeaponDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			weaponId: '',
			weapons: [],
			loading: false,
			errorOnLoad: null,
			errorOnSave: null
		}
	}

	componentDidMount = () => this.loadWeapons()

	componentWillUnmount = () => this.isUnmounted = true

	loadWeapons() {
		if (this.isUnmounted) {
			return
		}

		this.setState({ loading: true, errorOnLoad: null }, () => {
			database.weapons
				.get()
				.then((weapons) => !this.isUnmounted && this.setState({ weapons, loading: false }))
				.catch((err) => !this.isUnmounted && this.setState( { errorOnLoad: err.message || err, loading: false}))
		})
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
		this.setState({ loading: true, errorOnSave: false }, () => {
			this.props.onSave(weaponId)
				.then(() => this.setState({ weaponId: '', loading: false }))
				.catch(err => this.setState({ loading: false, errorOnSave: err }))
		})
	}

	render() {
		let { weaponId, loading, errorOnLoad, errorOnSave } = this.state
		let { isOpen, onClose } = this.props

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>Add weapon to loadout</DialogTitle>

				<DialogContent>
					{ loading && <Loading /> }

					{ errorOnLoad && <Error error={ errorOnLoad } onRetry={ () => this.loadWeapons() } /> }
					{ errorOnSave && <Error error={ errorOnSave } fillBackground={ true } style={ { padding: '8px 0', marginBottom: '8px' } } /> }

					{ !loading && !errorOnLoad && (
						<WeaponSelect 
							weapons={ this.getSelectableWeapons() } 
							selectedWeaponId={ weaponId } 
							onWeaponSelected={ weaponId => this.onWeaponSelected(weaponId) } /
						>
					)}
				</DialogContent>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button
						disabled={ !this.formValid() || loading }
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
