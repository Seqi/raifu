import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SharedLoadout from 'app/features/share/SharedLoadout'

export default class Shared extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Router basename='/share'>
					<Switch>
						<Route path='/loadout/:loadoutId' component={ SharedLoadout } />
					</Switch>
				</Router>
			</React.Fragment>
		)
	}
}
