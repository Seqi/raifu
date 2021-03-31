import { FC } from 'react'
import { Switch, Route } from 'react-router-dom'

import LoadoutList from './components/LoadoutList/LoadoutList'
import LoadoutPage from './components/LoadoutPage/LoadoutPage'

const LoadoutRouter: FC = () => (
	<Switch>
		<Route path='/loadouts/:id' component={ LoadoutPage } />
		<Route path='/loadouts' component={ LoadoutList } />
	</Switch>
)

export default LoadoutRouter
