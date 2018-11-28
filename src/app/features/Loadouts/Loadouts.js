import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoadoutList from './LoadoutList'
import EditLoadout from './EditLoadout'

class Loadouts extends React.Component {
	render() {
		return (
			<Router basename='/app'>
				<Switch>
					<Route path='/:id' component={ EditLoadout } />
					<Route path='/' component={ LoadoutList } />
				</Switch>
			</Router>
		)
	}
}

export default Loadouts
