import './AuthPage.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginPage from './Login/LoginPage'
import SignupPage from './Signup/SignupPage'
import authClient from '../../../firebase/auth'

import Ump45 from 'assets/ump45.png'

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
				<div className='logo-box'>
					<span className='title'>Raifu</span>
					<img src={ Ump45 } alt='' />
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
