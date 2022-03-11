import { FC } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import Button from '@material-ui/core/Button'
import { FormTextField } from 'app/shared/extensions/material/FormTextField'

export type SignupFormFields = {
	email: string
	password: string
	confirmPassword: string
}

type SignupFormProps = {
	onSubmit: (val: SignupFormFields) => Promise<any>
}

export const SignupForm: FC<SignupFormProps> = ({ onSubmit }) => {
	let { watch, handleSubmit, formState, control } = useForm<SignupFormFields>({
		mode: 'onChange',
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormTextField
				form={{
					name: 'email',
					control,
					rules: { required: { value: true, message: 'Email is required.' } },
				}}
				label='E-mail'
				autoFocus={true}
				fullWidth={true}
				autoComplete='off'
			/>

			<FormTextField
				form={{
					name: 'password',
					control,
					rules: {
						required: { value: true, message: 'Password is required.' },
						minLength: { value: 6, message: 'Password must be at least 6 characters.' },
					},
				}}
				label='Password'
				type='password'
				margin='normal'
				fullWidth={true}
				autoComplete='off'
			/>

			<FormTextField
				form={{
					name: 'confirmPassword',
					control,
					rules: {
						validate: (value) => {
							if (value === watch('password')) {
								return true
							} else {
								return 'Passwords must match'
							}
						},
					},
				}}
				label='Confirm password'
				type='password'
				margin='dense'
				fullWidth={true}
				autoComplete='off'
			/>

			<Button
				disabled={!formState.isValid || formState.isSubmitting}
				fullWidth={true}
				variant='contained'
				color='primary'
				type='submit'
			>
				Sign up
			</Button>
		</form>
	)
}

SignupForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}
