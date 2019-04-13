import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LoadoutList from './LoadoutList'
import Loadout from './Loadout/Loadout'

class Loadouts extends React.Component {
	render() {
		return (
			<Switch>
				<Route path='/loadouts/:id' component={ Loadout } />
				<Route path='/loadouts' component={ LoadoutList } />
			</Switch>
		)
	}
}

export default Loadouts
