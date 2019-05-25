import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import { Loading, Error } from 'app/shared/components'
import AttachmentSelect from './AttachmentSelect'
import database from '../../../../../../../../../firebase/database'

class AddAttachmentDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			attachmentIds: [],
			attachments: [],
			loading: false,
			errorOnLoad: null,
			errorOnSave: null
		}
	}	

	componentDidMount = () => this.loadAttachments()

	componentWillUnmount = () => this.isUnmounted = true	

	loadAttachments() {
		if (this.isUnmounted) {
			return
		}

		this.setState({ loading: true, errorOnLoad: null }, () => {
			database.attachments
				.get()
				.then((attachments) => !this.isUnmounted && this.setState({ attachments, loading: false }))
				.catch((err) => !this.isUnmounted && this.setState( { errorOnLoad: err.message || err, loading: false}))
		})
	}

	getSelectableAttachments() {
		return this.state.attachments.filter((a) => this.props.filterIds.indexOf(a.id) === -1)
	}

	onAttachmentSelected(attachmentId) {
		this.setState(prevState => {
			let existingIdIndex = prevState.attachmentIds.findIndex(id => id === attachmentId)

			let copy = prevState.attachmentIds.slice()

			if (existingIdIndex === -1) {
				copy.push(attachmentId)
			} else {
				copy.splice(existingIdIndex, 1)
			}

			return { attachmentIds: copy }
		})
	}

	formValid() {
		return this.state.attachmentIds.length > 0
	}

	onSave(attachmentIds) {
		this.setState({ loading: true, errorOnSave: false }, () => {
			this.props.onSave(attachmentIds)
				.then(() => this.setState({ attachmentIds: [], loading: false }))
				.catch(err => this.setState({ loading: false, errorOnSave: err }))
		})
	}

	render() {
		let { attachmentIds, loading, errorOnLoad, errorOnSave } = this.state
		let { weaponName, isOpen, onClose } = this.props

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>Add attachments to {weaponName} </DialogTitle>

				<DialogContent>
					{ loading && <Loading /> }

					{ errorOnLoad && <Error error={ errorOnLoad } onRetry={ () => this.loadAttachments() } /> }
					{ errorOnSave && <Error error={ errorOnSave } fillBackground={ true } style={ { padding: '8px 0', marginBottom: '8px' } } /> }

					<AttachmentSelect
						attachments={ this.getSelectableAttachments() } 
						selectedAttachmentIds={ attachmentIds } 
						onAttachmentSelected={ attachmentId => this.onAttachmentSelected(attachmentId) } 
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button
						disabled={ !this.formValid() || loading }
						variant='contained'
						onClick={ () => this.onSave(attachmentIds) }
						color='primary'
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

AddAttachmentDialog.propTypes = {
	weaponName: PropTypes.string.isRequired,
	filterIds: PropTypes.array,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

AddAttachmentDialog.defaultProps = {
	filterIds: []
}

export default AddAttachmentDialog
