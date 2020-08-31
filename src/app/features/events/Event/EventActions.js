import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { SpeedDial, SpeedDialAction } from '@material-ui/lab'

import ConfirmDeleteDialog from 'app/shared/actions/delete/ConfirmDeleteDialog'
import useIsPageAtBottom from 'app/shared/hooks/useIsPageAtBottom'
import { UserContext } from 'app/core/auth/contexts'

import EventChecklistDialog from './dialogs/EventChecklistDialog'
import EditEventDialog from '../EditEventDialog'

let isMyEvent = (user, event) => {
	return event.organiser_uid === user.uid
}

let getMyLoadout = (event) => {
	return event.users.length > 0 && event.users[0].loadout
}

function EventActions({ event, updateEvent, deleteEvent }) {
	let [dialog, setDialog] = useState()
	let [speedDialOpen, setSpeedDialOpen] = useState(false)

	let user = useContext(UserContext)

	let isAtBottom = useIsPageAtBottom()
	let isInvite = event.users.length === 0
	let canModify = isMyEvent(user, event)
	let canViewChecklist = event.users.length > 0 && event.users[0].loadout != null

	// Hide the entire speed dial if no actions are available
	let hasAvailableActions = canModify || canViewChecklist

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
				{canModify && (
					<SpeedDialAction
						icon={ <i className='fa fa-pen' /> }
						onClick={ () => setDialog('edit') }
						tooltipTitle='Edit'
						tooltipOpen={ true }
					/>
				)}

				{canModify && (
					<SpeedDialAction
						icon={ <i className='fa fa-trash' /> }
						onClick={ () => setDialog('delete') }
						tooltipTitle='Delete'
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
			{canModify && (
				<EditEventDialog
					event={ event }
					isOpen={ dialog === 'edit' }
					onSave={ (event) => updateEvent(event)
						.then(() => setDialog(null)) }
					onClose={ () => setDialog(null) }
				/>
			)}

			{canModify && (
				<ConfirmDeleteDialog
					verb='Delete'
					title={ event.getTitle() }
					isOpen={ dialog === 'delete' }
					onConfirm={ () => deleteEvent()
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
	event: PropTypes.object.isRequired,
	updateEvent: PropTypes.func.isRequired,
	deleteEvent: PropTypes.func.isRequired
}
