import React, { useState, useContext, useCallback } from 'react'

import { Card, CardContent, CardActions } from '@material-ui/core'

import AuthContext from '../../contexts/AuthContext'
import AuthCardHeader from '../AuthCardHeader'
import AuthCardActions from '../AuthCardActions'
import AuthError from '../AuthError'

import SignupForm from './SignupForm'

let SignupCard = () => {
	let { signup } = useContext(AuthContext)
	let [error, setError] = useState()

	let signupWithEmail = useCallback(({email, password}) => signup.withEmail(email, password)
		.catch((err) => setError(err.message)), [signup])

	return (
		<Card>
			<AuthCardHeader title='Sign up' />

			<CardContent>
				{ error && <AuthError message={ error } />}

				<SignupForm onSubmit={ signupWithEmail } />
			</CardContent>

			<CardActions>				
				<AuthCardActions to='../' text='Already have an account? Log in' />
			</CardActions>
		</Card>
	)	
}

export default SignupCard
