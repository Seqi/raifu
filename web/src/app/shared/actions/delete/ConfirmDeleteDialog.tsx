import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import { Error } from 'app/shared/state'

type ConfirmDeleteDialogProps = {
	verb?: string
	title: string
	isOpen: boolean
	onConfirm: () => Promise<any>
	onClose: () => any
}

type ConfirmDeleteDialogState = {
	error: string | null
	loading: boolean
}

class ConfirmDeleteDialog extends React.Component<
	ConfirmDeleteDialogProps,
	ConfirmDeleteDialogState
> {
	private isUnmounted = false

	constructor(props: ConfirmDeleteDialogProps) {
		super(props)

		this.state = this.defaultState
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}

	get defaultState(): ConfirmDeleteDialogState {
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
						!this.isUnmounted &&
						this.setState({ loading: false, error: 'An error ocurred.' })
				)
		})
	}

	render() {
		const { verb, onClose, isOpen, title } = this.props
		const { error, loading } = this.state

		return (
			// No idea why we have to stop event propagation here on click? I may have messed something up
			<Dialog
				fullWidth={true}
				onClick={(e) => e.stopPropagation()}
				open={isOpen}
				onClose={onClose}
			>
				<DialogTitle>
					{verb} {title}?
				</DialogTitle>

				{error && (
					<DialogContent style={{ paddingTop: 0, paddingBottom: 0 }}>
						<Error error={error} fillBackground={true} />
					</DialogContent>
				)}

				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						variant='contained'
						onClick={() => this.delete()}
						color='primary'
						disabled={loading}
					>
						{verb}
					</Button>
				</DialogActions>
			</Dialog>
		)
	}

	public static propTypes = {
		title: PropTypes.string.isRequired,
		verb: PropTypes.oneOfType([
			PropTypes.oneOf(['Delete', 'Remove'] as const),
			PropTypes.string,
		]),
		isOpen: PropTypes.bool.isRequired,
		onClose: PropTypes.func.isRequired,
		onConfirm: PropTypes.func.isRequired,
	}

	public static defaultProps = {
		verb: 'Delete',
	}
}

export default ConfirmDeleteDialog
