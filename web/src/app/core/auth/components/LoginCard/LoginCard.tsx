import { useState, useContext, useCallback, FC } from 'react'

import { Box, Card, CardContent, CardActions, styled } from '@material-ui/core'

import { AuthContext } from '../../contexts/AuthContext'
import AuthCardHeader from '../AuthCardHeader'
import AuthCardActions from '../AuthCardActions'
import AuthError from '../AuthError'

import LoginForm, { LoginFormFields } from './LoginForm'
import LoginProviders from './LoginProviders'

const AuthCardContent = styled(CardContent)({ paddingBottom: 0 })

const LoginCard: FC = () => {
	let auth = useContext(AuthContext)
	let [error, setError] = useState<string | undefined>()

	let loginWithEmail = useCallback(
		async ({ email, password }: LoginFormFields) => {
			try {
				await auth?.login.withEmail(email, password)
			} catch (e) {
				setError('An error occured logging in. Please try again.')
			}
		},
		[auth]
	)
	let loginWithTwitter = useCallback(async () => {
		try {
			await auth?.login.withTwitter()
		} catch (e) {
			setError('An error occured logging in. Please try again.')
		}
	}, [auth])

	let loginWithGoogle = useCallback(async () => {
		try {
			await auth?.login.withGoogle()
		} catch (e) {
			setError('An error occured logging in. Please try again.')
		}
	}, [auth])

	return (
		<Card>
			<AuthCardHeader title='Sign in' />

			<AuthCardContent>
				{error && <AuthError message={error} />}

				<LoginForm onSubmit={loginWithEmail} />

				<Box textAlign='center' marginTop={1.5}>
					<div>OR SIGN IN WITH</div>
					<LoginProviders
						loginWithTwitter={loginWithTwitter}
						loginWithGoogle={loginWithGoogle}
					/>
				</Box>
			</AuthCardContent>

			<CardActions>
				<AuthCardActions to='signup' text='Don&#39;t have an account? Sign up here' />
			</CardActions>
		</Card>
	)
}

export default LoginCard
