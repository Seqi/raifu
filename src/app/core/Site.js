import './Site.css'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Loading from 'app/shared/Loading'
import { UserContextProvider, AuthContextProvider } from './auth/contexts'
import NavBar from './layout/Navbar/Navbar'
import AnnouncementBanner from './layout/AnnouncementBanner'
import AuthPage from './auth/components/AuthPage'

import HomePage from './pages/Home'
const App = lazy(() => import('./pages/App'))
const Shared = lazy(() => import('./pages/Shared'))

let showAnnouncements = process.env.NODE_ENV !== 'development'

let Site = () => {
	return (
		<div className='app'>
			<Router>
				<AuthContextProvider>
					<UserContextProvider>
						<Switch>
							<Route path='/login' component={ AuthPage } />
							<Route path='/' render={ () => 
								<React.Fragment>
									<NavBar />
									<Suspense fallback={ <Loading /> }>
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
				
			{ showAnnouncements && <AnnouncementBanner /> }
		</div>
	)
}

export default Site
