import { FC } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './App'

const AppRouter: FC = () => {
	return (
		// TODO: Basename armory and move app basename?
		<Router basename='app'>
			<Route path='/' component={ App } />
		</Router>
	)
}

export default AppRouter
