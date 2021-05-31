import React, { FC, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { Snackbar, styled, Button, IconButton } from '@material-ui/core'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import Alert from '@material-ui/lab/Alert'
import PersonAddOutlined from '@material-ui/icons/PersonAddOutlined'
import Close from '@material-ui/icons/Close'

import ConfirmDeleteDialog from 'app/shared/actions/delete/ConfirmDeleteDialog'
import useIsPageAtBottom from 'app/shared/hooks/useIsPageAtBottom'
import { Loadout } from 'app/features/loadouts'

import EventChecklistDialog from './dialogs/EventChecklistDialog'
import EditEventDialog, { EventUpdate } from '../EditEventDialog'
import { Event, EventPropShape } from '../../models'

let getMyLoadout = (event: Event): Loadout | null | undefined => {
	return event.users![0]?.loadout
}

type EventActionsProps = {
	event: Event
	updateEvent: (event: EventUpdate) => any
	deleteEvent: () => any
	leaveEvent: () => any
}

type EventActionsDialogs = 'edit' | 'delete' | 'leave' | 'checklist' | null

const RaifuAlert = styled(Alert)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
}))

const EventActions: FC<EventActionsProps> = ({
	event,
	updateEvent,
	deleteEvent,
	leaveEvent,
}) => {
	let [dialog, setDialog] = useState<EventActionsDialogs>(null)
	let [speedDialOpen, setSpeedDialOpen] = useState(false)
	let [snackbarOpen, setSnackbarOpen] = useState(event.users?.length === 1 || false)

	const userLoadout = getMyLoadout(event)

	let isAtBottom = useIsPageAtBottom()
	let isInvite = event.users!.length === 0
	let canViewChecklist = userLoadout != null

	// Hide the entire speed dial if no actions are available

	let hasAvailableActions = event.owner || canViewChecklist
	const handleSnackbarAction = useCallback(() => {
		setDialog('edit')
		setSnackbarOpen(false)
	}, [])

	const handleSnackbarClose = useCallback(
		(event?: React.SyntheticEvent, reason?: string) => {
			if (reason === 'clickaway') {
				return
			}

			setSnackbarOpen(false)
		},
		[]
	)

	return (
		<>
			{/* Actions */}
			<SpeedDial
				ariaLabel='Event Actions'
				icon={ <i className='fa fa-pen' /> }
				onOpen={ () => setSpeedDialOpen(true) }
				onClose={ () => setSpeedDialOpen(false) }
				open={ speedDialOpen }
				hidden={ isAtBottom || isInvite || !hasAvailableActions }
			>
				{event.owner && (
					<SpeedDialAction
						icon={ <i className='fa fa-pen' /> }
						onClick={ () => setDialog('edit') }
						tooltipTitle='Edit'
						tooltipOpen={ true }
					/>
				)}

				{event.owner && (
					<SpeedDialAction
						icon={ <i className='fa fa-trash' /> }
						onClick={ () => setDialog('delete') }
						tooltipTitle='Delete'
						tooltipOpen={ true }
					/>
				)}

				{!event.owner && (
					<SpeedDialAction
						icon={ <i className='fa fa-sign-out-alt' /> }
						onClick={ () => setDialog('leave') }
						tooltipTitle='Leave'
						tooltipOpen={ true }
					/>
				)}

				{canViewChecklist && (
					<SpeedDialAction
						icon={ <i className='fa fa-clipboard' /> }
						onClick={ () => setDialog('checklist') }
						tooltipTitle='Checklist'
						tooltipOpen={ true }
					/>
				)}
			</SpeedDial>

			{/* Dialogs */}
			{event.owner && (
				<EditEventDialog
					event={ event }
					isOpen={ dialog === 'edit' }
					onSave={ (event) => updateEvent(event)
						.then(() => setDialog(null)) }
					onClose={ () => setDialog(null) }
				/>
			)}

			{event.owner && (
				<ConfirmDeleteDialog
					verb='Delete'
					title={ event.getTitle() }
					isOpen={ dialog === 'delete' }
					onConfirm={ () => deleteEvent()
						.then(() => setDialog(null)) }
					onClose={ () => setDialog(null) }
				/>
			)}

			{!event.owner && (
				<ConfirmDeleteDialog
					verb='Leave'
					title={ event.getTitle() }
					isOpen={ dialog === 'leave' }
					onConfirm={ () => leaveEvent()
						.then(() => setDialog(null)) }
					onClose={ () => setDialog(null) }
				/>
			)}

			{userLoadout != null && (
				<EventChecklistDialog
					title={ event.getTitle() }
					loadout={ userLoadout }
					isOpen={ dialog === 'checklist' }
					onClose={ () => setDialog(null) }
				/>
			)}

			<Snackbar open={ snackbarOpen } onClose={ handleSnackbarClose } autoHideDuration={ 6000 }>
				<RaifuAlert
					elevation={ 6 }
					variant='filled'
					onClose={ handleSnackbarClose }
					icon={ <PersonAddOutlined /> }
					action={
						<>
							<Button onClick={ handleSnackbarAction } variant='text'>
								Invite
							</Button>
							<IconButton onClick={ handleSnackbarClose } size='small'>
								<Close />
							</IconButton>
						</>
					}
				>
					Get some backup and bring some friends!
				</RaifuAlert>
			</Snackbar>
		</>
	)
}

export default EventActions

EventActions.propTypes = {
	event: PropTypes.shape(EventPropShape).isRequired,
	updateEvent: PropTypes.func.isRequired,
	deleteEvent: PropTypes.func.isRequired,
	leaveEvent: PropTypes.func.isRequired,
}
