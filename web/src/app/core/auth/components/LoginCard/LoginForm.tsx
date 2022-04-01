import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'

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
	const { handleSubmit, formState, control } = useForm<LoginFormFields>({
		mode: 'onChange',
	})

	return (
		/* eslint-disable-next-line @typescript-eslint/no-misused-promises */
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormTextField
				form={{ name: 'email', control, rules: { required: true } }}
				label='E-mail'
				autoComplete='email'
				fullWidth={true}
				autoFocus={true}
			/>

			<FormTextField
				form={{ name: 'password', control, rules: { required: true } }}
				label='Password'
				type='password'
				margin='normal'
				autoComplete='current-password'
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
