import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LoadoutList from './LoadoutList'
import Loadout from './Loadout/Loadout'

let LoadoutRouter = () => (
	<Switch>
		<Route path='/loadouts/:id' component={ Loadout } />
		<Route path='/loadouts' component={ LoadoutList } />
	</Switch>
)
	
export default LoadoutRouter
