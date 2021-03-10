import { FC } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export type SignupFormFields = {
	email: string
	password: string
	confirmPassword: string
}

type SignupFormProps = {
	onSubmit: (val: SignupFormFields) => Promise<any>
}

export const SignupForm: FC<SignupFormProps> = ({ onSubmit }) => {
	let { register, watch, handleSubmit, formState, errors } = useForm<SignupFormFields>({
		mode: 'onChange',
	})

	return (
		<form onSubmit={ handleSubmit(onSubmit) }>
			<TextField
				inputRef={ register({ required: true }) }
				name='email'
				label='E-mail'
				autoFocus={ true }
				fullWidth={ true }
				autoComplete='off'
				error={ !!errors.email }
				helperText={ errors.email && 'Email is required' }
			/>

			<TextField
				inputRef={ register({
					required: true,
					minLength: 6,
				}) }
				name='password'
				label='Password'
				type='password'
				margin='normal'
				fullWidth={ true }
				autoComplete='off'
				error={ !!errors.password }
				helperText={ errors.password && 'Minimum of six characters' }
			/>

			<TextField
				inputRef={ register({
					validate: (value) => value === watch('password'),
				}) }
				name='confirmPassword'
				label='Confirm password'
				type='password'
				margin='dense'
				fullWidth={ true }
				autoComplete='off'
				error={ !!errors.confirmPassword }
				helperText={ errors.confirmPassword && 'Passwords must match' }
			/>

			<Button
				disabled={ !formState.isValid || formState.isSubmitting }
				fullWidth={ true }
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
