import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ReactiveTitle from 'app/shared/components/Text/ReactiveTitle'
import auth from '../../../../firebase/auth'

import EditEventDialog from '../EditEventDialog'
import EventChecklist from './EventChecklist'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'


let isMyEvent = (event) => {
	return event.organiser_uid === auth.user.uid
}

let getMyLoadout = (event) => {
	return event.users[0].loadout
}

function EventActions( { event, updateEvent, deleteEvent }) {
	let [ activeDialog, setActiveDialog] = useState()

	return (
		<React.Fragment>
			<ReactiveTitle>
				{ event.name }
			
				{ isMyEvent(event) && <i onClick={ () => setActiveDialog('edit') } className='fa fa-pen icon-action' /> }
				{ isMyEvent(event) && <i onClick={ () => setActiveDialog('delete') } className='fa fa-times icon-action' />}
				{ getMyLoadout(event) && <i onClick={ () => setActiveDialog('checklist') } className='fa fa-clipboard icon-action' /> }
			</ReactiveTitle>

			<ReactiveTitle variant='h4' mobileVariant='h5'>
				{ event.location } @ { event.date.toLocaleString() }
			</ReactiveTitle>

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