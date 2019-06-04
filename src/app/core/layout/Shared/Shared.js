import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from 'app/core/layout/Navbar/Navbar'
import SharedLoadout from 'app/features/Share/SharedLoadout'

export default class Shared extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Navbar />
				<Router basename='/share' >
					<Switch>
						<Route path='/loadout/:loadoutId' component={ SharedLoadout } />
					</Switch>
				</Router>
			</React.Fragment>
		)
	}
}