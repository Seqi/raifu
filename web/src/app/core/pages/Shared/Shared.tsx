import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SharedLoadout from 'app/features/share/SharedLoadout'

const Shared: FC = () => {
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

export default Shared
