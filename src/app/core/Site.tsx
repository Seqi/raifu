import React, { FC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { UserContextProvider, AuthContextProvider } from './auth/contexts'
import AuthPage from './auth/components/AuthPage'

import App from './pages/App'
import Shared from './pages/Shared'
import HomePage from './pages/Home'

let Site: FC = () => {
	return (
		<Router>
			<AuthContextProvider>
				<UserContextProvider>
					<Switch>
						<Route path='/login' component={ AuthPage } />
						<Route path='/' component={ HomePage } exact={ true } />
						<Route path='/app' component={ App } />
						<Route path='/share' component={ Shared } />
					</Switch>
				</UserContextProvider>
			</AuthContextProvider>
		</Router>
	)
}

export default Site
