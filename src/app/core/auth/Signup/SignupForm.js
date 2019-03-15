import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class LoginForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			confirmPassword: ''
		}
	}

	handleChange(evt) {
		this.setState({ [evt.target.id]: evt.target.value })
	}

	handleSubmit(evt) {
		evt.preventDefault()
		this.props.onSubmit(this.state.email, this.state.password)
	}

	formValid() {
		return (
			this.state.email.length > 0 &&
			this.state.password.length >= 6 &&
			this.state.password === this.state.confirmPassword
		)
	}

	render() {
		return (
			<form onSubmit={ (evt) => this.handleSubmit(evt) } className='login-form'>
				<TextField
					id='email'
					label='E-mail'
					value={ this.state.email }
					onChange={ (evt) => this.handleChange(evt) }
					autoFocus={ true }
					error={ this.state.email.length === 0 }
				/>
				<TextField
					id='password'
					label='Password'
					type='password'
					value={ this.state.password }
					onChange={ (evt) => this.handleChange(evt) }
					helperText='Minimum of six characters'
				/>
				<TextField
					id='confirmPassword'
					label='Confirm password'
					type='password'
					value={ this.state.confirmPassword }
					onChange={ (evt) => this.handleChange(evt) }
					error={ this.state.password !== this.state.confirmPassword }
				/>

				<Button disabled={ !this.formValid() } variant='contained' color='primary' type='submit'>
					Sign up
				</Button>
			</form>
		)
	}
}

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default LoginForm
