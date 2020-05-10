import React from 'react'
import { Route, Switch } from 'react-router-dom'

import EventList from './EventList'
import Event from './Event'

let EventRouter = () => {
	return (
		<Switch>
			<Route path='/events/:id' component={Event} />
			<Route path='/events' component={EventList} />
		</Switch>
	)
}

export default EventRouter
