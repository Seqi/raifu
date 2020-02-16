import React from 'react'
import PropTypes from 'prop-types'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'

function EventHeader( { event }) {
	return (
		<React.Fragment>
			<ReactiveTitle>{ event.name }</ReactiveTitle>

			<ReactiveTitle variant='h4' mobileVariant='h5'>
				{ event.location } @ { event.date.toLocaleString() }
			</ReactiveTitle>
		</React.Fragment>
	)
}

export default EventHeader

EventHeader.propTypes = {
	event: PropTypes.shape({
		name: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		date: PropTypes.object.isRequired
	}).isRequired,
}