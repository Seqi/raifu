import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { SpeedDial, SpeedDialAction } from '@material-ui/lab'

import EditEventDialog from '../EventList/EditEventDialog'
import EventChecklist from './EventChecklist'
import ConfirmDeleteDialog from 'app/shared/dialogs/ConfirmDeleteDialog'
import { UserContext } from 'app/core/auth/contexts'

let isMyEvent = (user, event) => {
	return event.organiser_uid === user.uid
}

let getMyLoadout = (event) => {
	return event.users[0].loadout
}

function EventActions( { event, updateEvent, deleteEvent, open, onOpen, onClose }) {
	let [ dialog, setDialog] = useState()
	let user = useContext(UserContext)

	return (
		<React.Fragment>
			{/* Actions */}
			<SpeedDial 
				ariaLabel='Loadout Actions' 
				icon={ <i className='fa fa-pen' /> }
				onOpen={ onOpen }
				onClose={ onClose }
				open={ open }
				hidden={ event.users.length === 0 }
			>
				<SpeedDialAction 
					hidden={ isMyEvent(user, event) }
					icon={ <i className='fa fa-pen' /> }
					onClick={ () => setDialog('edit') }
					tooltipTitle='Edit'
					tooltipOpen={ true }
				/>

				<SpeedDialAction 
					hidden={ isMyEvent(user, event) }
					icon={ <i className='fa fa-trash' /> }
					onClick={ () => setDialog('delete') }
					tooltipTitle='Delete'
					tooltipOpen={ true }
				/>		

				<SpeedDialAction 
					hidden={ !!getMyLoadout(event) }
					icon={ <i className='fa fa-clipboard' /> }
					onClick={  () => setDialog('checklist') }
					tooltipTitle='Checklist'
					tooltipOpen={ true }
				/>
			</SpeedDial>

			{/* Dialogs */}
			<EditEventDialog 
				event={ event }
				isOpen={ dialog === 'edit' }
				onSave={ (event) => updateEvent(event)
					.then(() => setDialog(null)) 
				}
				onClose={ () => setDialog(null) } />

			<ConfirmDeleteDialog 
				verb='Delete'
				title={ event.getTitle() }
				isOpen={ dialog === 'delete' }
				onConfirm={ () => deleteEvent()
					.then(() => setDialog(null)) 
				}
				onClose={ () => setDialog(null) }
			/>

			{ getMyLoadout(event) && 
				<EventChecklist
					title={ event.getTitle() }
					loadout={ getMyLoadout(event) }
					isOpen={ dialog === 'checklist' }
					onClose={ () => setDialog(null) }
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

	open: PropTypes.bool.isRequired,
	onOpen: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
}