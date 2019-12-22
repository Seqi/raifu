import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { UserContextProvider, AuthContextProvider } from './auth/contexts'
import NavBar from './layout/Navbar/Navbar'
import AnnouncementBanner from './layout/AnnouncementBanner'
import AuthPage from './auth/components/AuthPage'
import { HomePage, App, Shared } from './pages'
import './Site.css'

let showAnnouncements = process.env.NODE_ENV !== 'development'

let Site = () =>  {
	return (
		<div className='app'>
			<Router>
				<AuthContextProvider>
					<UserContextProvider>
						<Switch>
							<Route path='/login' component={ AuthPage } />
							<Route path='/' component={ () => 
								<React.Fragment>
									<NavBar />
									<Switch>
										<Route path='/app' component={ App } />
										<Route path='/share' component={ Shared } />
										<Route path='/' component={ HomePage } />
									</Switch>
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
