import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'

import { Error } from 'app/shared/components'
import database from '../../../../firebase/database'

class SetShareableDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loadout: {
				shared: this.props.loadout.shared
			},
			loading: false,
			error: null
		}
	}

	get shareableLink() {
		return `${window.location.origin}/share/loadout/${this.props.loadout.id}`
	}

	handleShare(isShared) {
		let { loadout } = this.props 

		this.setState({loading: true, error: null }, () => {
			database.loadouts.edit(loadout.id, { ...loadout, shared: isShared})
				.then(() => this.setState({ loading: false, error: null, loadout: { shared: isShared } }))
				.then(() => this.props.onShare(isShared))
				.catch(err => this.setState({ 
					error: err.statusText || err.message || err, 
					loading: false, 
					loadout: { shared: !isShared } 
				}))
		})
	}

	render() {
		let { isOpen, onClose } = this.props
		let { loading, error, loadout } = this.state

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>Share loadout</DialogTitle>

				<DialogContent>					
					{ error && <Error error={ error } fillBackground={ true } style={ { padding: '8px 0', marginBottom: '8px' } } /> }

					<TextField
						fullWidth={ true }
						label='URL'
						value={ loadout.shared ? this.shareableLink : 'Share this loadout to get a shareable URL' }
						disabled={ true }
					/>

					<div>
						<FormControlLabel 
							style={ {float:'right'} }
							label='Share'
							onChange={ e => this.handleShare(e.target.checked) }
							control={ <Checkbox disabled={ loading } checked={ loadout.shared } /> }
						/>
					</div>
				</DialogContent>

				<DialogActions>
					<Button onClick={ onClose } color='primary'>Close</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

SetShareableDialog.propTypes = {
	loadout: PropTypes.shape({
		id: PropTypes.string.isRequired,
		shared: PropTypes.bool.isRequired
	}).isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onShare: PropTypes.func.isRequired
}

export default SetShareableDialog
