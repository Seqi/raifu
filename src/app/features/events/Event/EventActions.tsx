import React, { FC, useState } from 'react'
import PropTypes from 'prop-types'

import { SpeedDial, SpeedDialAction } from '@material-ui/lab'

import ConfirmDeleteDialog from 'app/shared/actions/delete/ConfirmDeleteDialog'
import useIsPageAtBottom from 'app/shared/hooks/useIsPageAtBottom'

import EventChecklistDialog from './dialogs/EventChecklistDialog'
import EditEventDialog, { EventUpdate } from '../EditEventDialog'
import Event from 'app/shared/models/event'

let getMyLoadout = (event: Event) => {
	return event.users.length > 0 && event.users[0].loadout
}

type EventActionsProps = {
	event: Event
	updateEvent: (event: EventUpdate) => any
	deleteEvent: () => any
	leaveEvent: () => any
}

type EventActionsDialogs = 'edit' | 'delete' | 'leave' | 'checklist' | null

const EventActions: FC<EventActionsProps> = ({
	event,
	updateEvent,
	deleteEvent,
	leaveEvent,
}) => {
	let [dialog, setDialog] = useState<EventActionsDialogs>(null)
	let [speedDialOpen, setSpeedDialOpen] = useState(false)

	let isAtBottom = useIsPageAtBottom()
	let isInvite = event.users.length === 0
	let canViewChecklist = !!getMyLoadout(event)

	// Hide the entire speed dial if no actions are available
	let hasAvailableActions = event.owner || canViewChecklist

	return (
		<React.Fragment>
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

			{canViewChecklist && (
				<EventChecklistDialog
					title={ event.getTitle() }
					loadout={ getMyLoadout(event) }
					isOpen={ dialog === 'checklist' }
					onClose={ () => setDialog(null) }
				/>
			)}
		</React.Fragment>
	)
}

export default EventActions

EventActions.propTypes = {
	event: PropTypes.any.isRequired,
	updateEvent: PropTypes.func.isRequired,
	deleteEvent: PropTypes.func.isRequired,
	leaveEvent: PropTypes.func.isRequired,
}
