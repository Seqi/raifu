import { FC } from 'react'
import PropTypes from 'prop-types'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@material-ui/core/Button'
import { FormTextField } from 'app/shared/extensions/material/FormTextField'

export type LoginFormFields = {
	email: string
	password: string
}

type LoginFormProps = {
	onSubmit: SubmitHandler<LoginFormFields>
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
	let { handleSubmit, formState, control } = useForm<LoginFormFields>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormTextField
				form={{
					name: 'email',
					control,
					rules: {
						required: {
							value: true,
							message: 'Email is required.',
						},
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Must be a valid email address',
						},
					},
				}}
				id='login-email'
				label='Email'
				autoComplete='email'
				fullWidth={true}
				autoFocus={true}
			/>

			<FormTextField
				form={{ name: 'password', control, rules: { required: true } }}
				id='login-password'
				label='Password'
				type='password'
				margin='normal'
				autoComplete={'current-password'}
				fullWidth={true}
			/>

			<Button
				fullWidth={true}
				disabled={!formState.isValid || formState.isSubmitting}
				variant='contained'
				color='primary'
				type='submit'
			>
				Sign in
			</Button>
		</form>
	)
}

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}

export default LoginForm
