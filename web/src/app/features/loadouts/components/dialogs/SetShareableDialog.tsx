// TODO: Prop Types
import React, { Component } from 'react'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Checkbox,
	FormControlLabel,
	Button,
	Tooltip,
} from '@material-ui/core'

import { loadouts } from 'app/data/api'
import { Error } from 'app/shared/state'

import { Loadout } from '../../models'

type SetShareableDialogProps = {
	loadout: Loadout
	onShare: (shared: boolean) => Promise<any>
	isOpen: boolean
	onClose: () => any
}

type SetShareableDialogState = {
	loading: boolean
	error: any
	shared: boolean
	copied: boolean
}

class SetShareableDialog extends Component<
	SetShareableDialogProps,
	SetShareableDialogState
> {
	private inputRef: React.RefObject<HTMLInputElement>

	constructor(props: SetShareableDialogProps) {
		super(props)
		this.state = {
			shared: this.props.loadout.shared,
			copied: false,
			loading: false,
			error: null,
		}

		this.inputRef = React.createRef<HTMLInputElement>()
	}

	get shareableLink() {
		return `${window.location.host}/share/loadout/${this.props.loadout.id}`
	}

	handleShare(isShared: boolean) {
		const { loadout } = this.props

		this.setState({ loading: true, error: null }, () => {
			loadouts
				.loadout(loadout.id)
				.share(isShared)
				.then(() => this.setState({ loading: false, error: null, shared: isShared }))
				.then(() => this.props.onShare(isShared))
				.catch((err) =>
					this.setState({
						error: 'An error occurred while making loadout shareable.',
						loading: false,
						shared: !isShared,
					})
				)
		})
	}

	copy() {
		// Re-do the animation if necessary
		this.setState({ copied: false }, () => {
			const input = this.inputRef.current

			if (!input) {
				return
			}

			input.disabled = false
			input.select()
			document.execCommand('copy')
			input.disabled = true
			this.setState({ copied: true })
		})
	}

	render() {
		const { isOpen, onClose } = this.props
		const { loading, error, shared, copied } = this.state

		return (
			<Dialog fullWidth={true} open={isOpen} onClose={onClose}>
				<DialogTitle>Share loadout</DialogTitle>

				<DialogContent>
					{error && <Error error={error} fillBackground={true} />}

					{shared ? (
						<TextField
							fullWidth={true}
							label='Your URL'
							value={this.shareableLink}
							disabled={true}
							inputRef={this.inputRef}
							InputProps={{
								endAdornment: (
									<Tooltip title='Copy link'>
										<i
											onClick={(_) => this.copy()}
											style={{ marginLeft: '8px', fontSize: '1rem', cursor: 'pointer' }}
											className='fa fa-link'
										/>
									</Tooltip>
								),
							}}
						/>
					) : (
						<div>Share this loadout to get a shareable URL.</div>
					)}

					<div>
						{copied && <span className='fade-in-short'>Copied!</span>}
						<FormControlLabel
							style={{ float: 'right' }}
							label='Share'
							onChange={(e) => this.handleShare((e.target as HTMLInputElement).checked)}
							control={<Checkbox disabled={loading} checked={shared} />}
						/>
					</div>
				</DialogContent>

				<DialogActions>
					<Button onClick={onClose} color='primary'>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

export default SetShareableDialog
