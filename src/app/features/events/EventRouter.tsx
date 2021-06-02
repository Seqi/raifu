import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import EventList from './components/EventList'
import EventDetails from './components/Event/EventDetails'

const EventRouter: FC = () => {
	return (
		<Switch>
			<Route path='/app/events/:id' component={ EventDetails } />
			<Route path='/app/events' component={ EventList } />
		</Switch>
	)
}

export default EventRouter
