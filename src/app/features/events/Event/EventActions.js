import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import Tooltip from '@material-ui/core/Tooltip'

import EditEventDialog from '../EventList/Dialogs/EditEventDialog'
import EventChecklist from './EventChecklist'
import ConfirmDeleteDialog from 'app/shared/components/Dialogs/ConfirmDeleteDialog'
import { UserContext } from 'app/core/auth/contexts'

let isMyEvent = (user, event) => {
	return event.organiser_uid === user.uid
}

let getMyLoadout = (event) => {
	return event.users[0].loadout
}

function EventActions( { event, updateEvent, deleteEvent }) {
	let [ activeDialog, setActiveDialog] = useState()
	let user = useContext(UserContext)

	return (
		<React.Fragment>
			{/* Actions */}
			{ isMyEvent(user, event) && (
				<React.Fragment>
					<Tooltip title='Edit' aria-label='edit'>
						<i onClick={ () => setActiveDialog('edit') } className='fa fa-pen icon-action' /> 
					</Tooltip>						
						
					<Tooltip title='Delete' aria-label='delete'>
						<i onClick={ () => setActiveDialog('delete') } className='fa fa-trash icon-action' />
					</Tooltip>
				</React.Fragment>
			)}

			{ getMyLoadout(event) && (					
				<Tooltip title='Checklist' aria-label='checklist'>
					<i onClick={ () => setActiveDialog('checklist') } className='fa fa-clipboard icon-action' /> 
				</Tooltip>
			)}

			{/* Dialogs */}
			<EditEventDialog 
				event={ event }
				isOpen={ activeDialog === 'edit' }
				onSave={ (event) => updateEvent(event)
					.then(() => setActiveDialog(null)) 
				}
				onClose={ () => setActiveDialog(null) } />

			<ConfirmDeleteDialog 
				verb='Delete'
				title={ event.getTitle() }
				isOpen={ activeDialog === 'delete' }
				onConfirm={ () => deleteEvent()
					.then(() => setActiveDialog(null)) 
				}
				onClose={ () => setActiveDialog(null) }
			/>

			{ getMyLoadout(event) && 
				<EventChecklist
					title={ event.getTitle() }
					loadout={ getMyLoadout(event) }
					isOpen={ activeDialog === 'checklist' }
					onClose={ () => setActiveDialog(null) }
				/>
			}
		</React.Fragment>
	)
}

export default EventActions

EventActions.propTypes = {
	event: PropTypes.object.isRequired,
	updateEvent: PropTypes.func.isRequired,
	deleteEvent: PropTypes.func.isRequired,
}