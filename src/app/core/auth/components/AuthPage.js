import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import UserContext from '../contexts/UserContext'
import Logo from 'app/core/layout/Logo'

import LoginPage from './Login/LoginPage'
import SignupPage from './Signup/SignupPage'

import './AuthPage.css'

function AuthPage({ history }) {
	let user = useContext(UserContext)

	useEffect(() => {
		if (user) {
			history.push('/app')
		}
	}, [user, history])

	return (
		<div className='auth-container'>
			<div>
				<Logo />
			</div>

			<div style={ { 
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				margin: 'auto',
				width: '90%',
				maxWidth: '600px'
			} }>
				<Router basename='/login'>
					<Switch>
						<Route path='/signup' component={ SignupPage } />
						<Route path='/' component={ LoginPage } />
					</Switch>
				</Router>
			</div>
		</div>
	)
}

export default AuthPage
