import { FC } from 'react'
import PropTypes from 'prop-types'

import { LoadoutView } from 'app/features/loadouts'
import { ErrorOverlay } from 'app/shared/state'
import { EventUser, EventUserPropShape } from '../../../models'

type EventMyLoadoutProps = {
	user: EventUser
}

const EventMyLoadout: FC<EventMyLoadoutProps> = ({ user }) => {
	if (!user.loadout) {
		return (
			<ErrorOverlay
				icon='fas fa-crosshairs'
				message='User has not added a loadout to this event.'
			/>
		)
	}

	return <LoadoutView loadout={ user.loadout } editable={ false } />
}

export default EventMyLoadout

EventMyLoadout.propTypes = {
	user: PropTypes.shape(EventUserPropShape).isRequired,
}
