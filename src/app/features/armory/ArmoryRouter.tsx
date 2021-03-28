import { FC } from 'react'
import { Switch, Route } from 'react-router-dom'

import Armory from './components/Armory'

const LoadoutRouter: FC = () => (
	<Switch>
		<Route path='/armory' component={ Armory } />
	</Switch>
)

export default LoadoutRouter
