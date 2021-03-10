import { useState, useContext, useCallback, FC } from 'react'

import { Card, CardContent, CardActions } from '@material-ui/core'

import { AuthContext } from '../../contexts/AuthContext'
import AuthCardHeader from '../AuthCardHeader'
import AuthCardActions from '../AuthCardActions'
import AuthError from '../AuthError'

import { SignupForm, SignupFormFields } from './SignupForm'

let SignupCard: FC = () => {
	let auth = useContext(AuthContext)
	let [error, setError] = useState<string | null>(null)

	const signupWithEmail = useCallback(
		async ({ email, password }: SignupFormFields) => {
			if (!auth) {
				throw new Error('No auth context was found.')
			}

			try {
				await auth.signup.withEmail(email, password)
			} catch (e) {
				setError(e.message)
			}
		},
		[auth]
	)

	return (
		<Card>
			<AuthCardHeader title='Sign up' />

			<CardContent>
				{error && <AuthError message={ error } />}

				<SignupForm onSubmit={ signupWithEmail } />
			</CardContent>

			<CardActions>
				<AuthCardActions to='../' text='Already have an account? Log in' />
			</CardActions>
		</Card>
	)
}

export default SignupCard
