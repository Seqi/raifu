import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

import { LoadingOverlay } from 'app/shared/state'
import { events } from 'app/data/api'

const EventInvite = ({ event, onJoin }) => {
	let [loading, setLoading] = useState(false)

	let joinEvent = () => {
		setLoading(true)
		
		events.join(event.id)
			.then(() => setLoading(false))
			.then(onJoin)
	}

	if (loading) {
		return <LoadingOverlay />
	}

	return (
		<div className='separator-padding'>
			<Button onClick={ joinEvent } variant='outlined' color='primary' style={ { width: '100%'} }>
					Join event!
			</Button>
		</div>
	)
}

export default EventInvite

EventInvite.propTypes = {
	event: PropTypes.object.isRequired,
	onJoin: PropTypes.func.isRequired
}
	