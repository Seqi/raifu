import { FC } from 'react'
import PropTypes from 'prop-types'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export type LoginFormFields = {
	email: string
	password: string
}

type LoginFormProps = {
	onSubmit: SubmitHandler<LoginFormFields>
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
	let { register, handleSubmit, formState } = useForm<LoginFormFields>({
		mode: 'onChange',
	})

	return (
		<form onSubmit={ handleSubmit(onSubmit) }>
			<TextField
				inputRef={ register({ required: true }) }
				name='email'
				label='E-mail'
				autoComplete='email'
				fullWidth={ true }
				autoFocus={ true }
			/>

			<TextField
				inputRef={ register({ required: true }) }
				name='password'
				label='Password'
				type='password'
				margin='normal'
				autoComplete={ 'current-password' }
				fullWidth={ true }
			/>

			<Button
				fullWidth={ true }
				disabled={ !formState.isValid || formState.isSubmitting }
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
