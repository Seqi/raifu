import { FC } from 'react'
import { Switch, Route } from 'react-router-dom'

import LoadoutList from './LoadoutList/LoadoutList'
import LoadoutPage from './LoadoutPage/LoadoutPage'

const LoadoutRouter: FC = () => (
	<Switch>
		<Route path='/loadouts/:id' component={ LoadoutPage } />
		<Route path='/loadouts' component={ LoadoutList } />
	</Switch>
)

export default LoadoutRouter
