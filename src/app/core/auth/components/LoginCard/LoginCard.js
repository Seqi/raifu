import React, { useState, useContext, useCallback} from 'react'

import { Box, Card, CardContent, CardActions, styled } from '@material-ui/core'

import AuthContext from '../../contexts/AuthContext'
import AuthCardHeader from '../AuthCardHeader'
import AuthCardActions from '../AuthCardActions'
import AuthError from '../AuthError'

import LoginForm from './LoginForm'
import LoginProviders from './LoginProviders'

const AuthCardContent = styled(CardContent)({ paddingBottom: 0 })

let LoginCard = () => {
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

			<AuthCardContent>
				{ error && <AuthError message={ error } />}

				<LoginForm onSubmit={ loginWithEmail } />

				<Box textAlign='center' marginTop={ 1.5 }>
					<div>OR SIGN IN WITH</div>					
					<LoginProviders loginWithTwitter={ loginWithTwitter } loginWithGoogle={ loginWithGoogle } />
				</Box>
			</AuthCardContent>

			<CardActions>
				<AuthCardActions to='/signup' text="Don&#39;t have an account? Sign up here" />
			</CardActions>
		</Card>
	)
}

export default LoginCard
