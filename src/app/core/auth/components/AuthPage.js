import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginPage from './Login/LoginPage'
import SignupPage from './Signup/SignupPage'
import Logo from 'app/shared/components/Logo'

import './AuthPage.css'
import UserContext from '../contexts/UserContext'

function AuthPage({ history }) {
	let user = useContext(UserContext)

	useEffect(() => {
		if (user) {
			history.push('/app')
		}
	}, [user, history])

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
