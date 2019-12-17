import './LoginPage.css'
import React, { useState, useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'

import {
	Card,
	CardContent,
	Icon,
	IconButton
} from '@material-ui/core'

import { AuthContext } from '../../contexts'
import LoginForm from './LoginForm'
import AuthCardHeader from '../AuthCardHeader'
import AuthError from '../AuthError'

let LoginPage = () => {
	let { login } = useContext(AuthContext)
	let [error, setError] = useState()

	let loginWithEmail = useCallback((email, pass) => login.withEmail(email, pass)
		.catch((err) => setError(err.message)), [login])
	let loginWithTwitter = useCallback(() => login.withTwitter()
		.catch((err) => setError(err.message)), [login])
	let loginWithGoogle = useCallback(() => login.withGoogle()
		.catch((err) => setError(err.message)), [login])

	return (
		<Card>
			<AuthCardHeader title='Sign in' />
			<CardContent>
				{ error && <AuthError message={ error } />}

				<LoginForm actionName='Log in' onSubmit={ loginWithEmail } />

				<div className='login-providers-container'>
					<div>Or sign in with..</div>
					<div className='login-providers'>
						<IconButton id='twitter-icon' onClick={ loginWithTwitter }>
							<Icon color='primary' className='fab fa-twitter' />
						</IconButton>
						<IconButton id='google-icon' onClick={ loginWithGoogle }>
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

export default LoginPage
