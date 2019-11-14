import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const EventInvite = ({ event }) => {
	return (
		<div className='separator-padding'>
			<Button variant='outlined' color='primary' style={ { width: '100%'} }>
					Join event!
			</Button>
		</div>
	)
}

export default EventInvite

EventInvite.propTypes = {
	event: PropTypes.object.isRequired
}
	