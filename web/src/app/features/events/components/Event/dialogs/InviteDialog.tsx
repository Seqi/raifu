import { FC, useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Tooltip,
	Typography,
} from '@material-ui/core'
import { useLocation } from 'react-router-dom'

const copyInputTextToClipboard = (input: HTMLInputElement | undefined) => {
	if (!input) {
		return
	}

	input.disabled = false
	input.select()
	document.execCommand('copy')
	input.disabled = true
}

export type InviteDialogProps = {
	isOpen: boolean
	onClose: () => void
}

export const InviteDialog: FC<InviteDialogProps> = ({ isOpen, onClose }) => {
	const ref = useRef<HTMLInputElement>()
	const location = useLocation()
	const [url, setUrl] = useState<string>('')

	useEffect(() => {
		setUrl(`${window.location.origin}${location.pathname}`)
	}, [location])

	return (
		<Dialog fullWidth={true} open={isOpen} onClose={onClose}>
			<DialogTitle>Invite to event</DialogTitle>

			<DialogContent>
				<Typography variant='body1'>Squad up and plan your loadouts!</Typography>
				<Typography variant='body1'>
					Send the below URL to invite others to this event.
				</Typography>

				<TextField
					fullWidth={true}
					value={url}
					disabled={true}
					inputRef={ref}
					InputProps={{
						endAdornment: (
							<Tooltip title='Copy link'>
								<i
									onClick={(_) => copyInputTextToClipboard(ref.current)}
									style={{ marginLeft: '8px', fontSize: '1rem', cursor: 'pointer' }}
									className='fa fa-link'
								/>
							</Tooltip>
						),
					}}
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose} color='primary'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default InviteDialog

InviteDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
}
