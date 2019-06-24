import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from './layout/Navbar/Navbar'
import AuthPage from './auth/AuthPage'
import Main from './layout/MainApp/Main'
import Shared from './layout/Shared/Shared'
import HomePage from './layout/Home'

class App extends Component {
	render() {
		return (
			<div className='app'>
				<Router>
					<React.Fragment>
						<Switch>
							<Route path='/login' component={ AuthPage } />
							<Route path='/' component={ () => 
								<React.Fragment>
									<NavBar />
									<Route path='/app' component={ Main } />
									<Route path='/share' component={ Shared } />
									<Route path='/' component={ HomePage } />
								</React.Fragment>
							} />
						</Switch>
					</React.Fragment>
				</Router>
			</div>
		)
	}
}

export default App
