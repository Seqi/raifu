import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import AuthPage from './auth/AuthPage'
import Main from './layout/Main'

class App extends Component {
	render() {
		return (
			<div className='app'>
				<Router>
					<Switch>
						<Route path='/login' component={ AuthPage } />
						<Route path='/app' component={ Main } />
						<Redirect from='/' to='/login' />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App
