import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import EventList from './EventList'
import Event from './Event'

const EventRouter: FC = () => {
	return (
		<Switch>
			<Route path='/events/:id' component={ Event } />
			<Route path='/events' component={ EventList } />
		</Switch>
	)
}

export default EventRouter
