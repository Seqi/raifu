import React, { useState, useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { Card, CardContent } from '@material-ui/core'

import { AuthContext } from '../../contexts'
import SignupForm from './SignupForm'
import AuthError from '../AuthError'
import AuthCardHeader from '../AuthCardHeader'

let LoginPage = () => {
	let { signup } = useContext(AuthContext)
	let [error, setError] = useState()

	let signupWithEmail = useCallback((email, pass) => signup.withEmail(email, pass)
		.catch((err) => setError(err.message))
	, [signup])

	return (
		<Card>
			<AuthCardHeader title='Sign up' />
			<CardContent>
				{ error && <AuthError message={ error } />}
				<SignupForm onSubmit={ signupWithEmail } />

				<div className='login-signup'>
					<Link to='../'>Already have an account? Log in</Link>
				</div>
			</CardContent>
		</Card>
	)
	
}

export default LoginPage
