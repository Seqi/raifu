import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@material-ui/core'

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
		<Box paddingTop={ 2 }>
			<Button onClick={ joinEvent } variant='outlined' color='primary' fullWidth={ true }>
				Join event!
			</Button>
		</Box>
	)
}

export default EventInvite

EventInvite.propTypes = {
	event: PropTypes.object.isRequired,
	onJoin: PropTypes.func.isRequired
}
	