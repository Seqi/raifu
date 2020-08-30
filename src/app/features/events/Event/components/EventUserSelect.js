import React from 'react'
import PropTypes from 'prop-types'

import { Tabs, Tab } from '@material-ui/core'

const EventUserSelect = ({ users, userIndex, onUserIndexChange }) => {
	return (
		<Tabs centered={true} value={userIndex} onChange={(e, idx) => onUserIndexChange(idx)}>
			{users.map((user, idx) => (
				<Tab key={user.uid} label={`${user.displayName} ${idx === 0 ? '(You)' : ''}`} />
			))}
		</Tabs>
	)
}

EventUserSelect.propTypes = {
	users: PropTypes.arrayOf(
		PropTypes.shape({
			uid: PropTypes.string.isRequired,
			displayName: PropTypes.string.isRequired,
		})
	).isRequired,
	userIndex: PropTypes.number.isRequired,
	onUserIndexChange: PropTypes.func.isRequired,
}

export default EventUserSelect
