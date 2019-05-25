import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import { Error } from 'app/shared/components'

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
		
		this.setState({ loading: true, error: null}, () => {
			this.props.onConfirm()
				.then(() => !this.isUnmounted && this.setState({ loading: false }))
				.catch((err) => !this.isUnmounted && this.setState({ loading: false, error: err.message || err }))
		})
	}

	render() {
		let { verb, onClose, isOpen, title } = this.props
		let { error, loading } = this.state

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>{ verb } { title }?</DialogTitle>

				{ error && (
					<DialogContent style={ {paddingTop: 0, paddingBottom: 0} }>
						<Error error={ error } fillBackground={ true } style={ { padding: '8px 0', marginBottom: '8px' } } /> 
					</DialogContent>
				)}

				<DialogActions>					

					<Button onClick={ onClose }>Cancel</Button>
					<Button
						variant='contained'
						onClick={ () => this.delete() }
						color='primary'
						disabled={ loading }
					>
						{ verb }
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
