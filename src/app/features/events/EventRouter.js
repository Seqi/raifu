import React from 'react'
import { Route, Switch } from 'react-router-dom'

import EventList from './EventList/EventList'
import Event from './Event/Event'

export default class EventRouter extends React.Component {
	render() {
		return (
			<Switch>
				<Route path='/events/:id' component={ Event } />
				<Route path='/events' component={ EventList } />
			</Switch>
		)
	}
}