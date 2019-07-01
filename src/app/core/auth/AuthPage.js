import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginPage from './Login/LoginPage'
import SignupPage from './Signup/SignupPage'
import Logo from 'app/shared/components/Logo'
import authClient from '../../../firebase/auth'

import './AuthPage.css'

class AuthPage extends Component {
	constructor(props) {
		super(props)
		// Listen out for successful login to redirect back
		// also handles if they're already authenticated
		this.authUnsubscribe = authClient.onAuthChanged((user) => {
			if (user) {
				this.props.history.push('/app')
			}
		})
	}

	componentWillUnmount() {
		this.authUnsubscribe()
	}

	render() {
		return (
			<div className='auth-container'>
				<div className='auth-logo-container'>
					<Logo height='250px' subtitle='Airsoft loadout management' />
				</div>

				<Router basename='/login'>
					<Switch>
						<Route path='/signup' component={ SignupPage } />
						<Route path='/' component={ LoginPage } />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default AuthPage
