import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import { Error } from 'app/shared/state'

class ConfirmDeleteDialog extends React.PureComponent {
	constructor(props) {
		super(props)

		this.state = this.defaultState
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}

	get defaultState() {
		return { loading: false, error: null }
	}

	delete() {
		if (this.isUnmounted) {
			return
		}

		this.setState({ loading: true, error: null }, () => {
			this.props
				.onConfirm()
				.then(() => !this.isUnmounted && this.setState({ loading: false }))
				.catch(
					(err) =>
						!this.isUnmounted && this.setState({ loading: false, error: 'An error ocurred while deleting' })
				)
		})
	}

	render() {
		let { verb, onClose, isOpen, title } = this.props
		let { error, loading } = this.state

		return (
			// No idea why we have to stop event propagation here on click? I may have messed something up
			<Dialog fullWidth={ true } onClick={ (e) => e.stopPropagation() } open={ isOpen } onClose={ onClose }>
				<DialogTitle>
					{verb} {title}?
				</DialogTitle>

				{error && (
					<DialogContent style={ { paddingTop: 0, paddingBottom: 0 } }>
						<Error error={ error } fillBackground={ true } />
					</DialogContent>
				)}

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button variant='contained' onClick={ () => this.delete() } color='primary' disabled={ loading }>
						{verb}
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

ConfirmDeleteDialog.propTypes = {
	title: PropTypes.string.isRequired,
	verb: PropTypes.oneOf(['Delete', 'Remove']),
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired
}

ConfirmDeleteDialog.defaultProps = {
	verb: 'Delete'
}

export default ConfirmDeleteDialog
