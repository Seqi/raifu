import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from './layout/Navbar/Navbar'
import AuthPage from './auth/components/AuthPage'
import Main from './layout/MainApp/Main'
import Shared from './layout/Shared/Shared'
import HomePage from './layout/Home'
import AnnouncementBanner from './layout/AnnouncementBanner'
import { UserContextProvider, AuthContextProvider } from './auth/contexts'

let showAnnouncements = process.env.NODE_ENV !== 'development'

class App extends Component {
	render() {
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
											<Route path='/app' component={ Main } />
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
}

export default App
