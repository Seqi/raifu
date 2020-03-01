import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class LoginForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: ''
		}
	}

	handleChange(evt) {
		this.setState({ [evt.target.id]: evt.target.value })
	}

	handleSubmit(evt) {
		this.props.onSubmit(this.state.email, this.state.password)
		evt.preventDefault()
	}

	formValid() {
		return this.state.email.length === 0 || this.state.password.length === 0
	}

	render() {
		return (
			<form onSubmit={ (evt) => this.handleSubmit(evt) }>
				<TextField
					id='email'
					label='E-mail'
					value={ this.state.email }
					autoComplete={ 'email' }
					onChange={ (evt) => this.handleChange(evt) }
					fullWidth={ true }
					autoFocus={ true }
				/>
				
				<TextField
					id='password'
					label='Password'
					type='password'
					margin='normal'
					value={ this.state.password }
					autoComplete={ 'current-password' }
					onChange={ (evt) => this.handleChange(evt) }
					fullWidth={ true }
				/>

				<Button fullWidth={ true } disabled={ this.formValid() } variant='contained' color='primary' type='submit'>
					Sign in
				</Button>
			</form>
		)
	}
}

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default LoginForm
