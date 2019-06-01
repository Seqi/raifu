import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import AuthPage from './auth/AuthPage'
import Main from './layout/MainApp/Main'
import Shared from './layout/Shared/Shared'
import Navbar from './layout/Navbar/Navbar'

class App extends Component {
	render() {
		return (
			<div className='app'>
				<Router>
					<React.Fragment>
						<Navbar />
						<Switch>
							<Route path='/login' component={ AuthPage } />
							<Route path='/app' component={ Main } />
							<Route path='/share' component={ Shared } />
							<Redirect from='/' to='/app' />
						</Switch>
					</React.Fragment>
				</Router>
			</div>
		)
	}
}

export default App
