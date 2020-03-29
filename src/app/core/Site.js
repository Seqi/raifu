import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoadingOverlay from 'app/shared/state/loading/LoadingOverlay'
import { UserContextProvider, AuthContextProvider } from './auth/contexts'
import NavBar from './layout/Navbar/Navbar'
import AuthPage from './auth/components/AuthPage'

import HomePage from './pages/Home'
const App = lazy(() => import('./pages/App'))
const Shared = lazy(() => import('./pages/Shared'))

let Site = () => {
	return (
		<React.Fragment>
			<Router>
				<AuthContextProvider>
					<UserContextProvider>
						<Switch>
							<Route path='/login' component={ AuthPage } />
							<Route path='/' render={ () => 
								<React.Fragment>
									<NavBar />
									<Suspense fallback={ <LoadingOverlay /> }>
										<Switch>
											<Route path='/' component={ HomePage } exact={ true } />
											<Route path='/app' component={ App } />
											<Route path='/share' component={ Shared } />
										</Switch>
									</Suspense>
								</React.Fragment>
							} />
						</Switch>
					</UserContextProvider>
				</AuthContextProvider>
			</Router>
		</React.Fragment>
	)
}

export default Site
