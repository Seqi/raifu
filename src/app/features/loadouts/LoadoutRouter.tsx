import { FC } from 'react'
import { Switch, Route } from 'react-router-dom'

import LoadoutList from './components/LoadoutList/LoadoutList'
import LoadoutPage from './components/LoadoutPage/LoadoutPage'

const LoadoutRouter: FC = () => (
	<Switch>
		<Route path='/app/loadouts/:id' component={ LoadoutPage } />
		<Route path='/app/loadouts' component={ LoadoutList } />
	</Switch>
)

export default LoadoutRouter
