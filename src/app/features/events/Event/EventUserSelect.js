import React from 'react'
import PropTypes from 'prop-types'

import { Tabs, Tab } from '@material-ui/core'

const EventUserSelect = ({ event, userIndex,  onUserIndexChange }) => {
	return (
		<Tabs centered={ true } value={ userIndex } onChange={ (e, idx) => onUserIndexChange(idx) }>
			{ event.users.map((user, idx) => (
				<Tab key={ user.uid } label={ `${user.displayName} ${idx === 0 ? '(You)' : '' }` } />
			))}
		</Tabs>
	)
}

EventUserSelect.propTypes = {
	event: PropTypes.object.isRequired,
	userIndex: PropTypes.number.isRequired,
	onUserIndexChange: PropTypes.func.isRequired,
}

export default EventUserSelect