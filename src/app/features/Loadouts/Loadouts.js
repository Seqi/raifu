import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoadoutList from './LoadoutList'
import Loadout from './Loadout/Loadout'

class Loadouts extends React.Component {
	render() {
		return (
			<Router basename='/app'>
				<Switch>
					<Route path='/:id' component={ Loadout } />
					<Route path='/' component={ LoadoutList } />
				</Switch>
			</Router>
		)
	}
}

export default Loadouts
