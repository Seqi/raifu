import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginPage from './Login/LoginPage'
import SignupPage from './Signup/SignupPage'
import Logo from 'app/shared/components/Logo'
import authClient from '../../../firebase/auth'

import './AuthPage.css'

function AuthPage({ history }) {
	useEffect(() => {
		// Listen out for successful login to redirect back
		// also handles if they're already authenticated
		let authUnsubscribe = authClient.onAuthChanged((user) => {
			if (user) {
				history.push('/app')
			}
		})

		return authUnsubscribe
	}, [])

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

export default AuthPage
