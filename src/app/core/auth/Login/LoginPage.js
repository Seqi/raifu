import './LoginPage.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

import AuthCardHeader from '../AuthCardHeader'
import LoginForm from './LoginForm'
import AuthError from 'app/core/auth/AuthError'
import authClient from '../../../../firebase/auth'

class LoginPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false,
			errorMessage: ''
		}
	}

	error(message) {
		this.setState({ error: true, errorMessage: message })
	}

	handleLogin(loginFunc) {
		loginFunc()
			.catch((err) => this.error(err.message))
	}

	loginWithEmail(email, pass) {
		this.handleLogin(() => authClient.login.withEmail(email, pass))
	}

	loginWithProvider(provider) {
		switch (provider) {
		case 'twitter':
			this.handleLogin(authClient.login.withTwitter)
			break
		case 'google':
			this.handleLogin(authClient.login.withGoogle)
			break
		default:
			this.error('Unsupported login provider')
			break
		}
	}

	render() {
		return (
			<Card>
				<AuthCardHeader title='Sign in' />
				<CardContent>
					{this.state.error && <AuthError message={ this.state.errorMessage } />}

					<LoginForm actionName='Log in' onSubmit={ (email, pass) => this.loginWithEmail(email, pass) } />

					<div className='login-providers-container'>
						<div>Or sign in with..</div>
						<div className='login-providers'>
							<IconButton id='twitter-icon' onClick={ () => this.loginWithProvider('twitter') }>
								<Icon color='primary' className='fab fa-twitter' />
							</IconButton>
							<IconButton id='google-icon' onClick={ () => this.loginWithProvider('google') }>
								<Icon color='primary' className='fab fa-google' />
							</IconButton>
						</div>
					</div>

					<div className='login-signup'>
						<Link to='/signup'>Don&#39;t have an account? Sign up here</Link>
					</div>
				</CardContent>
			</Card>
		)
	}
}

export default LoginPage
